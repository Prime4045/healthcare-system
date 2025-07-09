// Mock database with proper data structure and relationships
class MockDatabase {
  constructor() {
    this.users = new Map()
    this.appointments = new Map()
    this.doctors = new Map()
    this.healthRecords = new Map()
    this.notifications = new Map()
    this.payments = new Map()

    // Initialize with sample data
    this.initializeSampleData()
  }

  initializeSampleData() {
    // Sample doctors with Indian names and locations
    const sampleDoctors = [
      {
        id: "doc_1",
        firstName: "Dr. Priya",
        lastName: "Sharma",
        email: "priya.sharma@healthcare.in",
        specialty: "Cardiology",
        experience: "15+ years",
        rating: 4.9,
        reviews: 127,
        location: "Apollo Hospital, Delhi",
        consultationFee: 800,
        availableSlots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
        education: "AIIMS Delhi",
        languages: ["Hindi", "English"],
        about: "Specialized in interventional cardiology with expertise in complex cardiac procedures.",
        isAvailable: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "doc_2",
        firstName: "Dr. Rajesh",
        lastName: "Kumar",
        email: "rajesh.kumar@healthcare.in",
        specialty: "Neurology",
        experience: "12+ years",
        rating: 4.8,
        reviews: 98,
        location: "Fortis Hospital, Mumbai",
        consultationFee: 1200,
        availableSlots: ["11:00 AM", "1:00 PM", "4:00 PM", "5:30 PM"],
        education: "PGI Chandigarh",
        languages: ["Hindi", "English", "Marathi"],
        about: "Expert in treating neurological disorders including epilepsy and movement disorders.",
        isAvailable: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "doc_3",
        firstName: "Dr. Sunita",
        lastName: "Patel",
        email: "sunita.patel@healthcare.in",
        specialty: "General Medicine",
        experience: "10+ years",
        rating: 4.7,
        reviews: 156,
        location: "Max Hospital, Bangalore",
        consultationFee: 600,
        availableSlots: ["8:00 AM", "9:30 AM", "11:00 AM", "2:30 PM"],
        education: "JIPMER Puducherry",
        languages: ["Hindi", "English", "Kannada"],
        about: "Comprehensive primary care for patients of all ages with focus on preventive medicine.",
        isAvailable: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "doc_4",
        firstName: "Dr. Amit",
        lastName: "Singh",
        email: "amit.singh@healthcare.in",
        specialty: "Orthopedics",
        experience: "18+ years",
        rating: 4.9,
        reviews: 89,
        location: "Medanta Hospital, Gurgaon",
        consultationFee: 1000,
        availableSlots: ["10:00 AM", "12:00 PM", "3:00 PM", "4:30 PM"],
        education: "AIIMS Delhi",
        languages: ["Hindi", "English", "Punjabi"],
        about: "Specializes in joint replacement surgery and sports medicine injuries.",
        isAvailable: true,
        createdAt: new Date().toISOString(),
      },
    ]

    sampleDoctors.forEach((doctor) => {
      this.doctors.set(doctor.id, doctor)
    })

    // Sample users with Indian names and details
    const sampleUsers = [
      {
        id: "user_1",
        firstName: "Rahul",
        lastName: "Gupta",
        email: "patient@demo.com",
        phone: "+91 98765 43210",
        userType: "patient",
        dateOfBirth: "1985-06-15",
        address: "123 MG Road, Connaught Place, New Delhi 110001",
        emergencyContact: {
          name: "Priya Gupta",
          phone: "+91 98765 43211",
          relationship: "Spouse",
        },
        insurance: {
          provider: "Star Health Insurance",
          policyNumber: "SH123456789",
          groupNumber: "GRP001",
        },
        medicalHistory: ["Hypertension", "Diabetes Type 2"],
        allergies: ["Penicillin", "Shellfish"],
        medications: ["Metformin 500mg", "Telmisartan 40mg"],
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "user_2",
        firstName: "Dr. Priya",
        lastName: "Sharma",
        email: "doctor@demo.com",
        phone: "+91 98765 43212",
        userType: "doctor",
        licenseNumber: "MCI123456",
        specialty: "Cardiology",
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ]

    sampleUsers.forEach((user) => {
      this.users.set(user.id, user)
    })
  }

  // User operations
  createUser(userData) {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const user = {
      id,
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.users.set(id, user)
    return user
  }

  getUserByEmail(email) {
    return Array.from(this.users.values()).find((user) => user.email === email)
  }

  getUserById(id) {
    return this.users.get(id)
  }

  updateUser(id, updates) {
    const user = this.users.get(id)
    if (!user) return null

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    this.users.set(id, updatedUser)
    return updatedUser
  }

  // Appointment operations
  createAppointment(appointmentData) {
    const id = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const appointment = {
      id,
      ...appointmentData,
      status: "scheduled",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.appointments.set(id, appointment)
    return appointment
  }

  getAppointmentsByUserId(userId) {
    return Array.from(this.appointments.values()).filter((apt) => apt.patientId === userId)
  }

  getAppointmentsByDoctorId(doctorId) {
    return Array.from(this.appointments.values()).filter((apt) => apt.doctorId === doctorId)
  }

  updateAppointment(id, updates) {
    const appointment = this.appointments.get(id)
    if (!appointment) return null

    const updatedAppointment = {
      ...appointment,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    this.appointments.set(id, updatedAppointment)
    return updatedAppointment
  }

  deleteAppointment(id) {
    return this.appointments.delete(id)
  }

  // Doctor operations
  getAllDoctors() {
    return Array.from(this.doctors.values())
  }

  getDoctorById(id) {
    return this.doctors.get(id)
  }

  getDoctorsBySpecialty(specialty) {
    return Array.from(this.doctors.values()).filter((doc) =>
      doc.specialty.toLowerCase().includes(specialty.toLowerCase()),
    )
  }

  searchDoctors(query) {
    const searchTerm = query.toLowerCase()
    return Array.from(this.doctors.values()).filter(
      (doc) =>
        doc.firstName.toLowerCase().includes(searchTerm) ||
        doc.lastName.toLowerCase().includes(searchTerm) ||
        doc.specialty.toLowerCase().includes(searchTerm),
    )
  }

  // Health records operations
  createHealthRecord(recordData) {
    const id = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const record = {
      id,
      ...recordData,
      createdAt: new Date().toISOString(),
    }
    this.healthRecords.set(id, record)
    return record
  }

  getHealthRecordsByUserId(userId) {
    return Array.from(this.healthRecords.values()).filter((rec) => rec.patientId === userId)
  }

  // Notification operations
  createNotification(notificationData) {
    const id = `not_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const notification = {
      id,
      ...notificationData,
      isRead: false,
      createdAt: new Date().toISOString(),
    }
    this.notifications.set(id, notification)
    return notification
  }

  getNotificationsByUserId(userId) {
    return Array.from(this.notifications.values()).filter((not) => not.userId === userId)
  }

  markNotificationAsRead(id) {
    const notification = this.notifications.get(id)
    if (!notification) return null

    notification.isRead = true
    notification.readAt = new Date().toISOString()
    this.notifications.set(id, notification)
    return notification
  }

  // Payment operations
  createPayment(paymentData) {
    const id = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const payment = {
      id,
      ...paymentData,
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    this.payments.set(id, payment)
    return payment
  }

  getPaymentsByUserId(userId) {
    return Array.from(this.payments.values()).filter((pay) => pay.userId === userId)
  }

  updatePaymentStatus(id, status) {
    const payment = this.payments.get(id)
    if (!payment) return null

    payment.status = status
    payment.updatedAt = new Date().toISOString()
    this.payments.set(id, payment)
    return payment
  }
}

// Create singleton instance
const db = new MockDatabase()

export default db
