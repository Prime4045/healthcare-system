"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Users, Activity, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Add the imports at the top
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DoctorDashboard() {
  const [user, setUser] = useState(null)
  const [todayAppointments, setTodayAppointments] = useState([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Mock appointments data
    setTodayAppointments([
      {
        id: "1",
        patientName: "John Smith",
        patientAge: 45,
        time: "9:00 AM",
        type: "in-person",
        status: "scheduled",
        reason: "Regular checkup",
      },
      {
        id: "2",
        patientName: "Sarah Wilson",
        patientAge: 32,
        time: "10:30 AM",
        type: "video-call",
        status: "scheduled",
        reason: "Follow-up consultation",
      },
      {
        id: "3",
        patientName: "Michael Johnson",
        patientAge: 28,
        time: "2:00 PM",
        type: "in-person",
        status: "completed",
        reason: "Skin examination",
      },
      {
        id: "4",
        patientName: "Emily Davis",
        patientAge: 55,
        time: "3:30 PM",
        type: "in-person",
        status: "scheduled",
        reason: "Blood pressure check",
      },
    ])
  }, [])

  const upcomingAppointments = todayAppointments.filter((apt) => apt.status === "scheduled")
  const completedToday = todayAppointments.filter((apt) => apt.status === "completed").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. {user?.lastName || "Doctor"}!</h1>
          <p className="text-gray-600 mt-2">Here's your schedule and patient overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">247</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                        appointment.status === "completed"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                          <p className="text-gray-600 text-sm">
                            Age: {appointment.patientAge} • {appointment.reason}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {appointment.time}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                appointment.type === "video-call"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {appointment.type === "video-call" ? "Video Call" : "In-Person"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointment.status === "scheduled" && (
                          <>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            {appointment.type === "video-call" && (
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                Start Call
                              </Button>
                            )}
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <span className="text-green-600 font-medium text-sm">Completed</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {todayAppointments.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No appointments scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Patient Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                    <Users className="w-4 h-4 mr-2" />
                    View All Patients
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Patient Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Activity className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Alice Johnson", lastVisit: "2 days ago", condition: "Hypertension" },
                    { name: "Bob Smith", lastVisit: "1 week ago", condition: "Diabetes" },
                    { name: "Carol Davis", lastVisit: "2 weeks ago", condition: "Regular checkup" },
                  ].map((patient, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.condition}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{patient.lastVisit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Appointments</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New Patients</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Follow-ups</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Video Calls</span>
                    <span className="font-medium">15</span>
                  </div>
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
