import { NextResponse } from "next/server"
import db from "@/lib/database"
import { AuthService } from "@/lib/auth"
import { validateAppointmentData } from "@/lib/validation"

export async function POST(request) {
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

    // Validate appointment data
    const validation = validateAppointmentData(body)
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

    // Check if doctor exists
    const doctor = db.getDoctorById(body.doctorId)
    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor not found",
        },
        { status: 404 },
      )
    }

    // Check if doctor is available
    if (!doctor.isAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor is not available",
        },
        { status: 400 },
      )
    }

    // Check for conflicting appointments
    const existingAppointments = db.getAppointmentsByDoctorId(body.doctorId)
    const conflictingAppointment = existingAppointments.find(
      (apt) => apt.date === body.date && apt.time === body.time && apt.status !== "cancelled",
    )

    if (conflictingAppointment) {
      return NextResponse.json(
        {
          success: false,
          message: "This time slot is already booked",
        },
        { status: 409 },
      )
    }

    // Create appointment
    const appointmentData = {
      patientId: auth.userId,
      doctorId: body.doctorId,
      doctorName: body.doctorName || `${doctor.firstName} ${doctor.lastName}`,
      specialty: body.specialty || doctor.specialty,
      date: body.date,
      time: body.time,
      type: body.type,
      fee: body.fee || doctor.consultationFee,
      reason: body.reason || "General consultation",
      notes: body.notes || "",
    }

    const newAppointment = db.createAppointment(appointmentData)

    // Create notifications
    db.createNotification({
      userId: auth.userId,
      title: "Appointment Booked",
      message: `Your appointment with ${appointmentData.doctorName} has been scheduled for ${body.date} at ${body.time}`,
      type: "appointment",
      relatedId: newAppointment.id,
    })

    // Create payment record if fee exists
    if (appointmentData.fee > 0) {
      db.createPayment({
        userId: auth.userId,
        appointmentId: newAppointment.id,
        amount: appointmentData.fee,
        description: `Consultation fee for ${appointmentData.doctorName}`,
        dueDate: body.date,
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        appointment: newAppointment,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Appointment booking error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

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

    // Get user's appointments
    const appointments = db.getAppointmentsByUserId(auth.userId)

    // Sort by date and time
    appointments.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateB - dateA
    })

    return NextResponse.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error("Get appointments error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
