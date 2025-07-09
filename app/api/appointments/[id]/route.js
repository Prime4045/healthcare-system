import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"

export async function GET(request, { params }) {
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

    const appointmentId = params.id
    const appointment = db.appointments.get(appointmentId)

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 },
      )
    }

    // Check if user owns this appointment or is the doctor
    if (appointment.patientId !== auth.userId && appointment.doctorId !== auth.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 },
      )
    }

    return NextResponse.json({
      success: true,
      appointment,
    })
  } catch (error) {
    console.error("Get appointment error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

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

    const appointmentId = params.id
    const body = await request.json()

    const appointment = db.appointments.get(appointmentId)
    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 },
      )
    }

    // Check if user owns this appointment
    if (appointment.patientId !== auth.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 },
      )
    }

    // Check if appointment can be modified (not within 24 hours)
    const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`)
    const now = new Date()
    const timeDiff = appointmentDateTime - now
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    if (hoursDiff < 24 && appointment.status === "scheduled") {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot modify appointment within 24 hours",
        },
        { status: 400 },
      )
    }

    // Update appointment
    const updatedAppointment = db.updateAppointment(appointmentId, body)

    // Create notification
    db.createNotification({
      userId: auth.userId,
      title: "Appointment Updated",
      message: `Your appointment with ${appointment.doctorName} has been updated`,
      type: "appointment",
      relatedId: appointmentId,
    })

    return NextResponse.json({
      success: true,
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    })
  } catch (error) {
    console.error("Update appointment error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
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

    const appointmentId = params.id
    const appointment = db.appointments.get(appointmentId)

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found",
        },
        { status: 404 },
      )
    }

    // Check if user owns this appointment
    if (appointment.patientId !== auth.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 },
      )
    }

    // Check cancellation policy (24 hours notice)
    const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`)
    const now = new Date()
    const timeDiff = appointmentDateTime - now
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    let cancellationFee = 0
    if (hoursDiff < 24 && hoursDiff > 0) {
      cancellationFee = appointment.fee * 0.5 // 50% cancellation fee
    }

    // Update appointment status to cancelled
    const cancelledAppointment = db.updateAppointment(appointmentId, {
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
      cancellationFee,
    })

    // Create notification
    db.createNotification({
      userId: auth.userId,
      title: "Appointment Cancelled",
      message: `Your appointment with ${appointment.doctorName} has been cancelled${cancellationFee > 0 ? ` with a $${cancellationFee} cancellation fee` : ""}`,
      type: "appointment",
      relatedId: appointmentId,
    })

    return NextResponse.json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment: cancelledAppointment,
      cancellationFee,
    })
  } catch (error) {
    console.error("Cancel appointment error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
