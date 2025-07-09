import Link from "next/link"
import { Calendar, Star, MapPin, Clock, Search, Filter, Award, Users, Shield, Video, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function DoctorsPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 127,
      experience: "15+ years",
      location: "Apollo Hospital, Delhi",
      image: "/placeholder.svg?height=200&width=200",
      consultationFee: 800,
      nextAvailable: "Today",
      languages: ["Hindi", "English"],
      education: "AIIMS Delhi",
      about:
        "Specialized in interventional cardiology with expertise in complex cardiac procedures and heart disease prevention.",
      verified: true,
      awards: ["Best Cardiologist 2023", "Patient Choice Award"],
      totalPatients: 2500,
      onlineConsultation: true,
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Neurologist",
      rating: 4.8,
      reviews: 98,
      experience: "12+ years",
      location: "Fortis Hospital, Mumbai",
      image: "/placeholder.svg?height=200&width=200",
      consultationFee: 1200,
      nextAvailable: "Tomorrow",
      languages: ["Hindi", "English", "Marathi"],
      education: "PGI Chandigarh",
      about:
        "Expert in treating neurological disorders including epilepsy, stroke, and movement disorders with advanced techniques.",
      verified: true,
      awards: ["Neuro Excellence Award"],
      totalPatients: 1800,
      onlineConsultation: true,
    },
    {
      id: 3,
      name: "Dr. Sunita Patel",
      specialty: "General Medicine",
      rating: 4.7,
      reviews: 156,
      experience: "10+ years",
      location: "Max Hospital, Bangalore",
      image: "/placeholder.svg?height=200&width=200",
      consultationFee: 600,
      nextAvailable: "Today",
      languages: ["Hindi", "English", "Kannada"],
      education: "JIPMER Puducherry",
      about:
        "Comprehensive primary care for patients of all ages with focus on preventive medicine and chronic disease management.",
      verified: true,
      awards: ["Family Doctor of the Year"],
      totalPatients: 3200,
      onlineConsultation: true,
    },
    {
      id: 4,
      name: "Dr. Amit Singh",
      specialty: "Orthopedic Surgeon",
      rating: 4.9,
      reviews: 89,
      experience: "18+ years",
      location: "Medanta Hospital, Gurgaon",
      image: "/placeholder.svg?height=200&width=200",
      consultationFee: 1000,
      nextAvailable: "Tomorrow",
      languages: ["Hindi", "English", "Punjabi"],
      education: "AIIMS Delhi",
      about:
        "Specializes in joint replacement surgery, sports medicine injuries, and minimally invasive orthopedic procedures.",
      verified: true,
      awards: ["Best Ortho Surgeon", "Sports Medicine Expert"],
      totalPatients: 1500,
      onlineConsultation: false,
    },
    {
      id: 5,
      name: "Dr. Kavita Reddy",
      specialty: "Dermatologist",
      rating: 4.8,
      reviews: 134,
      experience: "8+ years",
      location: "Manipal Hospital, Hyderabad",
      image: "/placeholder.svg?height=200&width=200",
      consultationFee: 700,
      nextAvailable: "Today",
      languages: ["Hindi", "English", "Telugu"],
      education: "NIMS Hyderabad",
      about:
        "Expert in medical and cosmetic dermatology with focus on skin cancer prevention and advanced skin treatments.",
      verified: true,
      awards: ["Skin Care Expert"],
      totalPatients: 2100,
      onlineConsultation: true,
    },
    {
      id: 6,
      name: "Dr. Arjun Mehta",
      specialty: "Pediatrician",
      rating: 4.9,
      reviews: 203,
      experience: "14+ years",
      location: "Rainbow Children's Hospital, Chennai",
      image: "/placeholder.svg?height=200&width=200",
      consultationFee: 650,
      nextAvailable: "Today",
      languages: ["Hindi", "English", "Tamil"],
      education: "CMC Vellore",
      about:
        "Dedicated to providing comprehensive healthcare for children from birth to adolescence with specialized pediatric care.",
      verified: true,
      awards: ["Child Care Excellence", "Pediatric Expert"],
      totalPatients: 4500,
      onlineConsultation: true,
    },
  ]

  const specialties = [
    "All Specialties",
    "Cardiology",
    "Neurology",
    "General Medicine",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Gynecology",
    "Psychiatry",
    "Ophthalmology",
    "ENT",
    "Dentistry",
  ]

  const cities = ["All Cities", "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Gurgaon", "Pune", "Kolkata"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Find Your Doctor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced healthcare professionals across India who are committed to your wellbeing
          </p>
          <div className="flex justify-center mt-6 space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-emerald-600" />
              <span>MCI Verified</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-emerald-600" />
              <span>Top Rated</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-emerald-600" />
              <span>500+ Doctors</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Available Today
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Online Consultation
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Under ₹500
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Top Rated
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50">
              Experienced (10+ years)
            </Badge>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{doctors.length}</span> doctors found
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Sort by Rating</option>
            <option>Sort by Experience</option>
            <option>Sort by Fee (Low to High)</option>
            <option>Sort by Fee (High to Low)</option>
          </select>
        </div>

        {/* Doctors Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                    />
                    {doctor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                          {doctor.name}
                          {doctor.verified && (
                            <Badge className="ml-2 bg-emerald-100 text-emerald-800 text-xs">Verified</Badge>
                          )}
                        </h3>
                        <p className="text-emerald-600 font-medium">{doctor.specialty}</p>
                        <p className="text-gray-500 text-sm">{doctor.education}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
                        <div className="text-sm text-gray-600">Consultation</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="ml-1">({doctor.reviews} reviews)</span>
                      </div>
                      <span>{doctor.experience}</span>
                      <span>{doctor.totalPatients}+ patients</span>
                    </div>

                    <div className="flex items-center mb-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{doctor.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{doctor.about}</p>

                    {/* Awards */}
                    {doctor.awards && doctor.awards.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {doctor.awards.map((award, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {award}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doctor.nextAvailable === "Today"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Available {doctor.nextAvailable}
                        </span>
                        {doctor.onlineConsultation && (
                          <Badge variant="outline" className="text-xs">
                            <Video className="w-3 h-3 mr-1" />
                            Online
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Link href="/register">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-16">
          <Button
            variant="outline"
            size="lg"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
          >
            Load More Doctors
          </Button>
        </div>

        {/* Why Choose Our Doctors */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Doctors?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Top-Rated Professionals</h3>
              <p className="text-gray-600">All our doctors are highly rated by patients and MCI certified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">Book appointments instantly with real-time availability across India</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Options</h3>
              <p className="text-gray-600">In-person visits or online consultations available</p>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Specialties</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {specialties.slice(1, 9).map((specialty, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900">{specialty}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Emergency?</h2>
          <p className="text-gray-600 mb-6">For immediate medical assistance, contact our emergency services</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency: 102
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
              <Phone className="w-5 h-5 mr-2" />
              24/7 Helpline: +91 1800-123-4567
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
