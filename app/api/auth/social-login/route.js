import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { id, name, email, picture, provider } = body

    // Validate required fields
    if (!id || !email || !provider) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    let user = db.getUserByEmail(email)

    if (user) {
      // Update existing user with social provider info
      user = db.updateUser(user.id, {
        socialProviders: {
          ...user.socialProviders,
          [provider]: {
            id,
            picture,
            connectedAt: new Date().toISOString(),
          },
        },
        lastLoginAt: new Date().toISOString(),
      })
    } else {
      // Create new user from social login
      const [firstName, ...lastNameParts] = name.split(" ")
      const lastName = lastNameParts.join(" ") || ""

      const userData = {
        firstName,
        lastName,
        email,
        userType: "patient", // Default to patient, can be changed later
        socialProviders: {
          [provider]: {
            id,
            picture,
            connectedAt: new Date().toISOString(),
          },
        },
        profilePicture: picture,
        isEmailVerified: true, // Social logins are pre-verified
        registrationMethod: `social_${provider}`,
        lastLoginAt: new Date().toISOString(),
      }

      user = db.createUser(userData)

      // Create welcome notification
      db.createNotification({
        userId: user.id,
        title: "Welcome to HealthCare+",
        message: `Welcome ${firstName}! Your account has been created successfully using ${provider}.`,
        type: "welcome",
      })
    }

    // Generate JWT token
    const token = AuthService.generateToken({
      userId: user.id,
      email: user.email,
      userType: user.userType,
    })

    // Remove sensitive information
    const { socialProviders, ...safeUser } = user

    return NextResponse.json(
      {
        success: true,
        message: "Social login successful",
        token,
        user: safeUser,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Social login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
