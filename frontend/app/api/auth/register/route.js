import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"
import { validateUserRegistration, sanitizeUserData } from "@/lib/validation"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input data
    const validation = validateUserRegistration(body)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = db.getUserByEmail(body.email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        { status: 409 },
      )
    }

    // Hash password
    const hashedPassword = await AuthService.hashPassword(body.password)

    // Sanitize and prepare user data
    const userData = sanitizeUserData(body)
    userData.password = hashedPassword

    // Create user
    const newUser = db.createUser(userData)

    // Remove password from response
    const { password, ...userResponse } = newUser

    // Generate JWT token
    const token = AuthService.generateToken(newUser)

    // Create welcome notification
    db.createNotification({
      userId: newUser.id,
      title: "Welcome to HealthCare+!",
      message:
        "Your account has been created successfully. You can now book appointments and manage your health records.",
      type: "welcome",
    })

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: userResponse,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
