import Link from "next/link"
import { Video, Clock, Shield, Users, Star, Calendar, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function TelemedicinePage() {
  const features = [
    {
      icon: Video,
      title: "HD Video Consultations",
      description: "Crystal clear video calls with your healthcare providers from anywhere in India",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encrypted consultations ensuring your medical data stays confidential",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access healthcare professionals round the clock for urgent medical needs",
    },
    {
      icon: Users,
      title: "Specialist Network",
      description: "Connect with over 500+ verified doctors across various specialties",
    },
  ]

  const doctors = [
    {
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      consultationFee: 800,
      nextAvailable: "Today 2:00 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Neurologist",
      experience: "12+ years",
      rating: 4.8,
      consultationFee: 1200,
      nextAvailable: "Today 4:30 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Dr. Sunita Patel",
      specialty: "General Medicine",
      experience: "10+ years",
      rating: 4.7,
      consultationFee: 600,
      nextAvailable: "Tomorrow 9:00 AM",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const benefits = [
    "No travel time or waiting rooms",
    "Access to specialists across India",
    "Digital prescriptions and reports",
    "Follow-up consultations included",
    "Insurance coverage available",
    "Secure medical record storage",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <Video className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Telemedicine Consultations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with qualified doctors from the comfort of your home. Get expert medical advice through secure video
            consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Video className="w-5 h-5 mr-2" />
                Start Video Consultation
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule for Later
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Our Telemedicine?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Doctors */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available for Video Consultation</h2>
            <p className="text-gray-600">Connect with these doctors right now</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-emerald-600 text-sm">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-600">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{doctor.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="font-medium">₹{doctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Next Available:</span>
                      <span className="font-medium text-green-600">{doctor.nextAvailable}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Video className="w-4 h-4 mr-2" />
                    Consult Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Telemedicine</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/register">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      Get Started Today
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Telemedicine consultation"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-emerald-600 bg-opacity-10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Simple steps to get your consultation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Doctor</h3>
              <p className="text-gray-600">Select from our network of verified specialists based on your needs</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book & Pay</h3>
              <p className="text-gray-600">Schedule your appointment and make secure payment online</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Consultation</h3>
              <p className="text-gray-600">Join the video call at your scheduled time and get expert advice</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
              <p className="text-gray-600">No hidden fees, pay only for what you use</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 border rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">General Consultation</h3>
                <div className="text-3xl font-bold text-emerald-600 mb-4">₹500-800</div>
                <p className="text-gray-600 text-sm">Basic health consultation with general practitioners</p>
              </div>
              <div className="text-center p-6 border rounded-lg border-emerald-200 bg-emerald-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Specialist Consultation</h3>
                <div className="text-3xl font-bold text-emerald-600 mb-4">₹800-1500</div>
                <p className="text-gray-600 text-sm">Expert consultation with certified specialists</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow-up</h3>
                <div className="text-3xl font-bold text-emerald-600 mb-4">₹300-500</div>
                <p className="text-gray-600 text-sm">Follow-up consultations with the same doctor</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-emerald-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Consultation?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust our telemedicine platform for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Video className="w-5 h-5 mr-2" />
                Start Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
