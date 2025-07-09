export function validateAppointmentData(data) {
  const errors = []

  if (!data.doctorId) {
    errors.push("Doctor ID is required")
  }

  if (!data.date) {
    errors.push("Appointment date is required")
  } else {
    const appointmentDate = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (appointmentDate < today) {
      errors.push("Appointment date cannot be in the past")
    }
  }

  if (!data.time) {
    errors.push("Appointment time is required")
  }

  if (!data.type || !["in-person", "video-call"].includes(data.type)) {
    errors.push("Valid appointment type is required (in-person or video-call)")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateUserRegistration(data) {
  const errors = []

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push("First name must be at least 2 characters")
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push("Last name must be at least 2 characters")
  }

  if (!data.email) {
    errors.push("Email is required")
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required")
  }

  if (!data.phone) {
    errors.push("Phone number is required")
  } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(data.phone)) {
    errors.push("Valid phone number is required")
  }

  if (!data.password) {
    errors.push("Password is required")
  } else if (data.password.length < 8) {
    errors.push("Password must be at least 8 characters")
  }

  if (data.password !== data.confirmPassword) {
    errors.push("Passwords do not match")
  }

  if (!data.userType || !["patient", "doctor"].includes(data.userType)) {
    errors.push("Valid user type is required")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function sanitizeUserData(data) {
  return {
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    email: data.email?.toLowerCase().trim(),
    phone: data.phone?.trim(),
    userType: data.userType,
    dateOfBirth: data.dateOfBirth,
    address: data.address?.trim(),
    emergencyContact: data.emergencyContact,
    insurance: data.insurance,
    medicalHistory: data.medicalHistory || [],
    allergies: data.allergies || [],
    medications: data.medications || [],
  }
}
