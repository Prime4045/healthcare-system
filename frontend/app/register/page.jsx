"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"
import { authAPI } from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await authAPI.register(formData)
      
      if (response.data.success) {
        const { user, token, refreshToken } = response.data.data
        
        // Store auth data
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("authToken", token)
        localStorage.setItem("refreshToken", refreshToken)

        // Redirect based on user type
        if (formData.userType === "patient") {
          router.push("/patient/dashboard")
        } else {
          router.push("/doctor/dashboard")
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed"
      alert(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Benefits */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 text-white sticky top-8">
                <h2 className="text-3xl font-bold mb-6">Join HealthCare+ Today</h2>
                <p className="text-emerald-100 mb-8 text-lg">
                  Experience the future of healthcare with our comprehensive digital platform designed for your
                  convenience and wellbeing.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Instant Booking</h3>
                      <p className="text-emerald-100">Schedule appointments with top doctors in seconds</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Expert Care</h3>
                      <p className="text-emerald-100">Connect with 200+ certified healthcare professionals</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Secure Platform</h3>
                      <p className="text-emerald-100">HIPAA-compliant with enterprise-grade security</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Complete Health Management</h3>
                      <p className="text-emerald-100">Manage records, prescriptions, and follow-ups in one place</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-white/10 rounded-lg">
                  <p className="text-center text-emerald-100 mb-2">Trusted by healthcare professionals</p>
                  <div className="flex items-center justify-between text-center">
                    <div>
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-emerald-100 text-sm">Happy Patients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">15+</div>
                      <div className="text-emerald-100 text-sm">Specialties</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-emerald-100 text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="order-1 lg:order-2">
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left mb-8">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">HealthCare+</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                  <p className="text-gray-600">Join thousands of satisfied patients and healthcare professionals</p>
                </div>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* User Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                        <select
                          name="userType"
                          value={formData.userType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                          required
                        >
                          <option value="patient">Patient</option>
                          <option value="doctor">Healthcare Provider</option>
                        </select>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          required
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{" "}
                          <Link
                            href="/terms-of-service"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Privacy Policy
                          </Link>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 text-lg font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}