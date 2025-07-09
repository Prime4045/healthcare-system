import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function GET(request) {
  try {
    // Authenticate user
    const auth = await AuthService.authenticateRequest(request)
    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 },
      )
    }

    const user = db.getUserById(auth.userId)
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    // Remove password from response
    const { password, ...userProfile } = user

    return NextResponse.json({
      success: true,
      user: userProfile,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request) {
  try {
    // Authenticate user
    const auth = await AuthService.authenticateRequest(request)
    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 },
      )
    }

    const body = await request.json()

    // Remove sensitive fields that shouldn't be updated via this endpoint
    const { password, email, userType, id, ...updateData } = body

    const updatedUser = db.updateUser(auth.userId, updateData)
    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    // Remove password from response
    const { password: _, ...userResponse } = updatedUser

    // Create notification
    db.createNotification({
      userId: auth.userId,
      title: "Profile Updated",
      message: "Your profile information has been updated successfully",
      type: "account",
    })

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
