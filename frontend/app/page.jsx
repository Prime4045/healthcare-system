import Link from "next/link"
import {
  Calendar,
  Users,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Award,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Health, <span className="text-emerald-600">Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Book appointments with India's top healthcare professionals instantly. Manage your health records, get
                reminders, and access quality care from anywhere across the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/register">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3">
                    Book Appointment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 mt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-600">MCI Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-600">NABH Accredited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-600">1L+ Patients</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quick Booking</h3>
                    <p className="text-gray-600">Available 24/7</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Dr. Priya Sharma</span>
                    <span className="text-emerald-600 font-medium">Available</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Dr. Rajesh Kumar</span>
                    <span className="text-emerald-600 font-medium">Available</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Dr. Sunita Patel</span>
                    <span className="text-orange-500 font-medium">Busy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HealthCare India?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare like never before with our comprehensive digital platform designed for Indian
              patients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
                <p className="text-gray-600">Schedule appointments in seconds with our intuitive booking system</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
                <p className="text-gray-600">Connect with MCI certified healthcare professionals across India</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock customer support for all your healthcare needs</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your health data is protected with enterprise-grade security</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">1L+</div>
              <div className="text-emerald-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-emerald-100">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-emerald-100">Specializations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-emerald-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Patient from Delhi",
                content:
                  "HealthCare India made booking my appointment so easy. The doctors are professional and caring. Highly recommended for anyone looking for quality healthcare.",
                rating: 5,
              },
              {
                name: "Priya Gupta",
                role: "Patient from Mumbai",
                content:
                  "Excellent service! I can manage all my health records in one place. The telemedicine feature is particularly helpful during busy schedules.",
                rating: 5,
              },
              {
                name: "Amit Kumar",
                role: "Patient from Bangalore",
                content:
                  "The 24/7 support is amazing. I got help immediately when I needed to reschedule my appointment. Great platform for healthcare management.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions? We're here to help you with your healthcare needs across India.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+91 1800-123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">support@healthcare-india.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Address</div>
                    <div className="text-gray-600">123 Healthcare Avenue, Connaught Place, New Delhi 110001</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}