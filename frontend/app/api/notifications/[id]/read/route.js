import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function PUT(request, { params }) {
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

    const notificationId = params.id
    const notification = db.notifications.get(notificationId)

    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification not found",
        },
        { status: 404 },
      )
    }

    // Check if user owns this notification
    if (notification.userId !== auth.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 },
      )
    }

    const updatedNotification = db.markNotificationAsRead(notificationId)

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    })
  } catch (error) {
    console.error("Mark notification as read error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
