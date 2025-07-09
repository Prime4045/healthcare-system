import Link from "next/link"
import { Calendar, Video, FileText, Bell, Shield, Clock, Users, Heart, Pill, Activity, Phone, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function ServicesPage() {
  const mainServices = [
    {
      icon: Calendar,
      title: "Online Appointment Booking",
      description: "24/7 easy and instant appointment booking system across India",
      features: ["Instant Booking", "Real-time Availability", "Reminder Alerts", "Easy Rescheduling"],
      price: "Free",
      popular: true,
    },
    {
      icon: Video,
      title: "Telemedicine Consultation",
      description: "Consult with doctors via video call from the comfort of your home",
      features: ["HD Video Calls", "Secure Connection", "Recorded Consultations", "Prescription Sharing"],
      price: "From ₹200",
      popular: false,
    },
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "All your medical records stored securely in one place",
      features: ["Cloud Storage", "Easy Access", "Doctor Sharing", "Backup Security"],
      price: "₹99/month",
      popular: false,
    },
    {
      icon: Bell,
      title: "Smart Health Reminders",
      description: "Reminders for medicines, appointments, and health checkups",
      features: ["Medicine Alarms", "Appointment Reminders", "Health Tips", "Custom Alerts"],
      price: "Free",
      popular: false,
    },
  ]

  const additionalServices = [
    {
      icon: Home,
      title: "Home Visits",
      description: "Doctor visits at your home",
      price: "From ₹500",
    },
    {
      icon: Pill,
      title: "Online Pharmacy",
      description: "Medicine delivery to your doorstep",
      price: "Free Delivery",
    },
    {
      icon: Activity,
      title: "Health Checkup Packages",
      description: "Comprehensive health screening",
      price: "From ₹999",
    },
    {
      icon: Phone,
      title: "24/7 Helpline",
      description: "Emergency assistance anytime",
      price: "Free",
    },
  ]

  const specialties = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Gynecology",
    "ENT",
    "Dentistry",
    "Psychiatry",
    "Ophthalmology",
    "Urology",
    "Gastroenterology",
  ]

  const benefits = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data is completely safe and private",
    },
    {
      icon: Clock,
      title: "Time Saving",
      description: "No need to wait in long queues",
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "MCI certified and experienced doctors",
    },
    {
      icon: Heart,
      title: "Personal Care",
      description: "Special attention and care for every patient",
    },
  ]

  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Healthcare Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions combining modern technology with traditional care - designed for Indian
            patients
          </p>
        </div>

        {/* Main Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  service.popular ? "ring-2 ring-emerald-500" : ""
                }`}
              >
                <CardContent className="p-8">
                  {service.popular && <Badge className="mb-4 bg-emerald-600">Most Popular</Badge>}
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-600">{service.price}</span>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-emerald-600 font-semibold">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cities We Serve</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900">{city}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Specialties */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Medical Specialties</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900">{specialty}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
                <div className="text-4xl font-bold text-emerald-600 mb-4">Free</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Appointment Booking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Basic Reminders
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    24/7 Support
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg ring-2 ring-emerald-500">
              <CardContent className="p-8 text-center">
                <Badge className="mb-4 bg-emerald-600">Most Popular</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium</h3>
                <div className="text-4xl font-bold text-emerald-600 mb-4">₹299/month</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    All Basic Features
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Telemedicine Consultation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Digital Health Records
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Priority Support
                  </li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Choose Plan</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-emerald-600 mb-4">₹999/month</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    All Premium Features
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Home Visit Service
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Personal Health Manager
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                    Unlimited Consultations
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Healthcare Journey Today</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Experience better healthcare services - Register now and get your first consultation free
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3">
                Register Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 bg-transparent"
              >
                Need More Info?
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
