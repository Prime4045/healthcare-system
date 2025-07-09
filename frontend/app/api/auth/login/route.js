import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Find user
    const user = db.getUserByEmail(email.toLowerCase().trim())
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is deactivated. Please contact support.",
        },
        { status: 403 },
      )
    }

    // For demo purposes, accept "password123" for all users
    // In production, use: await AuthService.comparePassword(password, user.password)
    const isValidPassword = password === "password123" || (await AuthService.comparePassword(password, user.password))

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Generate JWT token
    const token = AuthService.generateToken(user)

    // Remove password from response
    const { password: _, ...userResponse } = user

    // Update last login
    db.updateUser(user.id, {
      lastLoginAt: new Date().toISOString(),
    })

    // Create login notification
    db.createNotification({
      userId: user.id,
      title: "Login Successful",
      message: `You logged in successfully at ${new Date().toLocaleString()}`,
      type: "security",
    })

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
