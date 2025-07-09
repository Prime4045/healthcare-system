import Link from "next/link"
import { Award, Heart, Shield, Target, CheckCircle, Users, Star, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Chief Medical Officer",
      specialty: "Cardiology",
      experience: "15+ years",
      image: "/placeholder.svg?height=300&width=300",
      education: "AIIMS Delhi",
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Head of Neurology",
      specialty: "Neurology",
      experience: "12+ years",
      image: "/placeholder.svg?height=300&width=300",
      education: "PGI Chandigarh",
    },
    {
      name: "Dr. Sunita Patel",
      role: "Director of Primary Care",
      specialty: "Family Medicine",
      experience: "10+ years",
      image: "/placeholder.svg?height=300&width=300",
      education: "JIPMER Puducherry",
    },
    {
      name: "Dr. Amit Singh",
      role: "Orthopedic Surgeon",
      specialty: "Orthopedics",
      experience: "18+ years",
      image: "/placeholder.svg?height=300&width=300",
      education: "AIIMS Delhi",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, respect, and genuine concern for their wellbeing.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Patient safety is our top priority in every procedure and interaction.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in medical care and patient experience.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We embrace cutting-edge technology to provide the best possible outcomes.",
    },
  ]

  const achievements = [
    "1,00,000+ Patients Served",
    "500+ Healthcare Professionals",
    "25+ Medical Specialties",
    "99.5% Patient Satisfaction",
    "MCI Compliant Platform",
    "24/7 Emergency Support",
  ]

  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description: "Started digital healthcare revolution in India",
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Extended services to 10+ major Indian cities",
    },
    {
      year: "2022",
      title: "Telemedicine",
      description: "Launched online consultation services",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced smart diagnosis assistance",
    },
  ]

  const partnerships = [
    {
      name: "Apollo Hospitals",
      type: "Hospital Network",
      description: "Strategic partnership for premium healthcare services",
    },
    {
      name: "Fortis Healthcare",
      type: "Medical Partner",
      description: "Collaboration for specialized treatments",
    },
    {
      name: "Max Healthcare",
      type: "Healthcare Provider",
      description: "Joint initiatives for patient care excellence",
    },
    {
      name: "Medanta",
      type: "Super Specialty",
      description: "Advanced medical procedures and treatments",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About HealthCare India</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming healthcare across India through technology, compassion, and excellence. We're committed to
            making quality healthcare accessible to every Indian citizen.
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize healthcare delivery in India by providing accessible, high-quality medical services
                through innovative technology and compassionate care. We believe every Indian deserves excellent
                healthcare, regardless of their location or economic circumstances.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be India's leading digital healthcare platform that connects patients with the best medical
                professionals, making healthcare more convenient, affordable, and effective for communities across the
                nation.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, HealthCare India was born from a simple yet powerful idea: healthcare should be
                  accessible, convenient, and patient-centered for every Indian. Our founders, a team of healthcare
                  professionals and technology experts, recognized the unique challenges faced by Indian patients in
                  accessing quality medical care.
                </p>
                <p>
                  Starting with a small team of dedicated professionals in Delhi, we've grown to serve over 1,00,000
                  patients across 25+ specialties in major Indian cities. Our platform has facilitated thousands of
                  appointments, consultations, and follow-ups, making healthcare more accessible than ever before in
                  India.
                </p>
                <p>
                  Today, we continue to innovate and expand our services across India, always keeping our patients'
                  needs at the heart of everything we do. From telemedicine to comprehensive health records management,
                  we're building the future of Indian healthcare.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-1">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.specialty}</p>
                  <p className="text-gray-500 text-sm mb-1">{member.experience}</p>
                  <p className="text-gray-500 text-xs">{member.education}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hospital Partnerships */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Hospital Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <Building className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h3>
                  <p className="text-emerald-600 text-sm font-medium mb-2">{partner.type}</p>
                  <p className="text-gray-600 text-sm">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-emerald-600 rounded-2xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact Across India</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1L+</div>
              <div className="text-emerald-100">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100">Healthcare Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-emerald-100">Medical Specialties</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-emerald-100">Cities Covered</div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Awards & Recognition</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Award className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Digital Health Platform</h3>
                <p className="text-gray-600">India Healthcare Awards 2023</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Star className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Top Rated Healthcare App</h3>
                <p className="text-gray-600">Google Play Store 2023</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Users className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient Choice Award</h3>
                <p className="text-gray-600">Healthcare Excellence India 2023</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Healthcare Community</h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of healthcare in India with HealthCare India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3">
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
