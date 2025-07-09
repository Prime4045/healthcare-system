import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET(request, { params }) {
  try {
    const doctorId = params.id
    const doctor = db.getDoctorById(doctorId)

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor not found",
        },
        { status: 404 },
      )
    }

    // Remove sensitive information
    const { email, ...publicDoctor } = doctor

    // Get doctor's appointments for availability
    const appointments = db.getAppointmentsByDoctorId(doctorId)
    const upcomingAppointments = appointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      const today = new Date()
      return aptDate >= today && apt.status === "scheduled"
    })

    return NextResponse.json({
      success: true,
      doctor: {
        ...publicDoctor,
        upcomingAppointments: upcomingAppointments.length,
        nextAvailableSlot: doctor.availableSlots[0], // Simplified logic
      },
    })
  } catch (error) {
    console.error("Get doctor error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
