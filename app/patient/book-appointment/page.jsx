"use client"

import { useState } from "react"
import { Clock, User, Search, Star, MapPin, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function BookAppointmentPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const doctors = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      rating: 4.9,
      experience: "15 years",
      location: "Apollo Hospital, Delhi",
      image: "/placeholder.svg?height=80&width=80",
      availableSlots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
      consultationFee: 800,
      nextAvailable: "Today",
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialty: "Dermatologist",
      rating: 4.8,
      experience: "12 years",
      location: "Fortis Hospital, Mumbai",
      image: "/placeholder.svg?height=80&width=80",
      availableSlots: ["11:00 AM", "1:00 PM", "4:00 PM", "5:30 PM"],
      consultationFee: 700,
      nextAvailable: "Tomorrow",
    },
    {
      id: "3",
      name: "Dr. Sunita Patel",
      specialty: "General Practitioner",
      rating: 4.7,
      experience: "10 years",
      location: "Max Hospital, Bangalore",
      image: "/placeholder.svg?height=80&width=80",
      availableSlots: ["8:00 AM", "9:30 AM", "11:00 AM", "2:30 PM"],
      consultationFee: 600,
      nextAvailable: "Today",
    },
    {
      id: "4",
      name: "Dr. Amit Singh",
      specialty: "Orthopedist",
      rating: 4.9,
      experience: "18 years",
      location: "Medanta Hospital, Gurgaon",
      image: "/placeholder.svg?height=80&width=80",
      availableSlots: ["10:00 AM", "12:00 PM", "3:00 PM", "4:30 PM"],
      consultationFee: 1000,
      nextAvailable: "Tomorrow",
    },
  ]

  const specialties = [
    "All",
    "Cardiologist",
    "Dermatologist",
    "General Practitioner",
    "Orthopedist",
    "Neurologist",
    "Pediatrician",
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty === "" || selectedSpecialty === "All" || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please select a doctor, date, and time")
      return
    }

    const appointmentData = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      fee: selectedDoctor.consultationFee,
    }

    try {
      const response = await fetch("/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        alert("Appointment booked successfully!")
        window.location.href = "/patient/dashboard"
      } else {
        alert("Failed to book appointment")
      }
    } catch (error) {
      alert("An error occurred while booking the appointment")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="text-gray-600 mt-2">Find and book appointments with top healthcare professionals</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Selection */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={selectedSpecialty === specialty ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Doctors List */}
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedDoctor?.id === doctor.id ? "ring-2 ring-emerald-500 shadow-lg" : ""
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span>{doctor.rating}</span>
                              </div>
                              <span>{doctor.experience} experience</span>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{doctor.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
                            <div className="text-sm text-gray-600">Consultation fee</div>
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Available {doctor.nextAvailable}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Panel */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedDoctor ? (
                  <>
                    {/* Selected Doctor */}
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedDoctor.image || "/placeholder.svg"}
                          alt={selectedDoctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                          <p className="text-emerald-600 text-sm">{selectedDoctor.specialty}</p>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Appointment Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={appointmentType === "in-person" ? "default" : "outline"}
                          onClick={() => setAppointmentType("in-person")}
                          className={`justify-start ${appointmentType === "in-person" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                        >
                          <User className="w-4 h-4 mr-2" />
                          In-Person
                        </Button>
                        <Button
                          variant={appointmentType === "video-call" ? "default" : "outline"}
                          onClick={() => setAppointmentType("video-call")}
                          className={`justify-start ${appointmentType === "video-call" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </Button>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Available Times</label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDoctor.availableSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime === time ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Appointment Summary</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>Doctor: {selectedDoctor.name}</div>
                        <div>Type: {appointmentType === "in-person" ? "In-Person" : "Video Call"}</div>
                        {selectedDate && <div>Date: {selectedDate}</div>}
                        {selectedTime && <div>Time: {selectedTime}</div>}
                        <div className="font-semibold text-gray-900 pt-2">Total: ₹{selectedDoctor.consultationFee}</div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <Button
                      onClick={handleBookAppointment}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={!selectedDate || !selectedTime}
                    >
                      Book Appointment
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a doctor to book an appointment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
