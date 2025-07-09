import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export class AuthService {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 12)
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }

  static generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.userType,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    )
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return null
    }
  }

  static extractTokenFromRequest(request) {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }
    return authHeader.substring(7)
  }

  static async authenticateRequest(request) {
    const token = this.extractTokenFromRequest(request)
    if (!token) {
      return null
    }

    const decoded = this.verifyToken(token)
    if (!decoded) {
      return null
    }

    return decoded
  }
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone) {
  const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

export function validatePassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
