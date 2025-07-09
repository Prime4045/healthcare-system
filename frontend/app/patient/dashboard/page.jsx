"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, MapPin, Bell, Settings, Plus, Video, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock patient data
  const patient = {
    name: "Rahul Gupta",
    email: "rahul.gupta@email.com",
    phone: "+91 98765 43210",
    address: "123 MG Road, Connaught Place, New Delhi 110001",
    dateOfBirth: "15 June 1985",
    bloodGroup: "O+",
    emergencyContact: "Priya Gupta (+91 98765 43211)",
  }

  // Mock appointments data
  const mockAppointments = [
    {
      id: 1,
      doctorName: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "in-person",
      status: "confirmed",
      location: "Apollo Hospital, Delhi",
      fee: 800,
    },
    {
      id: 2,
      doctorName: "Dr. Rajesh Kumar",
      specialty: "Neurologist",
      date: "2024-01-20",
      time: "2:30 PM",
      type: "video-call",
      status: "pending",
      location: "Online Consultation",
      fee: 1200,
    },
    {
      id: 3,
      doctorName: "Dr. Sunita Patel",
      specialty: "General Medicine",
      date: "2024-01-10",
      time: "9:00 AM",
      type: "in-person",
      status: "completed",
      location: "Max Hospital, Bangalore",
      fee: 600,
    },
  ]

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Priya Sharma is tomorrow at 10:00 AM",
      time: "2 hours ago",
      type: "reminder",
      isRead: false,
    },
    {
      id: 2,
      title: "Test Results Available",
      message: "Your blood test results are now available in your health records",
      time: "1 day ago",
      type: "results",
      isRead: false,
    },
    {
      id: 3,
      title: "Prescription Refill",
      message: "Time to refill your prescription for Metformin",
      time: "3 days ago",
      type: "prescription",
      isRead: true,
    },
  ]

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setAppointments(mockAppointments)
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status !== "completed")
  const recentAppointments = appointments.filter((apt) => apt.status === "completed").slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {patient.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your health appointments and records</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/patient/book-appointment">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Video className="w-4 h-4 mr-2" />
                    Video Consultation
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    View Records
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Appointments
                  </span>
                  <Badge variant="secondary">{upcomingAppointments.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                            <p className="text-emerald-600 text-sm">{appointment.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                            <div className="text-lg font-semibold text-gray-900 mt-1">₹{appointment.fee}</div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                          {appointment.type === "video-call" && (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              <Video className="w-4 h-4 mr-1" />
                              Join Call
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Link href="/patient/book-appointment">
                      <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Book Your First Appointment</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                            <p className="text-emerald-600 text-sm">{appointment.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span>{appointment.date}</span>
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(appointment.status)}>Completed</Badge>
                            <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent appointments</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{patient.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900">{patient.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Blood Group</label>
                  <p className="text-gray-900">{patient.bloodGroup}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </span>
                  <Badge variant="secondary">{notifications.filter((n) => !n.isRead).length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${notification.isRead ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}
                    >
                      <h4 className="font-medium text-sm text-gray-900">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Appointments</span>
                  <span className="font-semibold">{appointments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{recentAppointments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Upcoming</span>
                  <span className="font-semibold text-blue-600">{upcomingAppointments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Visit</span>
                  <span className="font-semibold">10 Jan 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
