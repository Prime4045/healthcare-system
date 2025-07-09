import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    let doctors = db.getAllDoctors()

    // Filter by specialty
    if (specialty && specialty !== "All Specialties") {
      doctors = doctors.filter((doc) => doc.specialty.toLowerCase().includes(specialty.toLowerCase()))
    }

    // Filter by search term
    if (search) {
      doctors = db.searchDoctors(search)
    }

    // Filter by location
    if (location && location !== "All Locations") {
      doctors = doctors.filter((doc) => doc.location.toLowerCase().includes(location.toLowerCase()))
    }

    // Sort by rating (highest first)
    doctors.sort((a, b) => b.rating - a.rating)

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedDoctors = doctors.slice(startIndex, endIndex)

    // Remove sensitive information
    const publicDoctors = paginatedDoctors.map((doc) => {
      const { email, ...publicDoc } = doc
      return publicDoc
    })

    return NextResponse.json({
      success: true,
      doctors: publicDoctors,
      pagination: {
        page,
        limit,
        total: doctors.length,
        totalPages: Math.ceil(doctors.length / limit),
        hasNext: endIndex < doctors.length,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get doctors error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
