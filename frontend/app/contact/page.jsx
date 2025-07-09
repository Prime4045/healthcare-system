import { Phone, Mail, MapPin, Clock, MessageCircle, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 1800-123-4567", "+91 98765-43210"],
      description: "24/7 available helpline",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@healthcare-india.com", "info@healthcare-india.com"],
      description: "Response guaranteed within 24 hours",
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: ["123 Healthcare Avenue", "Connaught Place, New Delhi 110001"],
      description: "Main office location",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday - Sunday: 10:00 AM - 6:00 PM"],
      description: "Emergency services available 24/7",
    },
  ]

  const offices = [
    {
      city: "Delhi",
      address: "123 Healthcare Avenue, Connaught Place",
      phone: "+91 11-2345-6789",
      email: "delhi@healthcare-india.com",
    },
    {
      city: "Mumbai",
      address: "456 Medical Street, Bandra West",
      phone: "+91 22-3456-7890",
      email: "mumbai@healthcare-india.com",
    },
    {
      city: "Bangalore",
      address: "789 Tech Park, Koramangala",
      phone: "+91 80-4567-8901",
      email: "bangalore@healthcare-india.com",
    },
    {
      city: "Chennai",
      address: "321 Health Center, T Nagar",
      phone: "+91 44-5678-9012",
      email: "chennai@healthcare-india.com",
    },
  ]

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "You can easily book appointments through our website or mobile app by selecting your preferred doctor and time slot.",
    },
    {
      question: "How does telemedicine consultation work?",
      answer:
        "Through video calls, you can consult with doctors from the comfort of your home. All you need is a stable internet connection.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we maintain the highest level of security and privacy standards to protect your health information.",
    },
    {
      question: "What should I do in case of emergency?",
      answer: "For immediate medical assistance, call 102 or contact our 24/7 helpline at +91 1800-123-4567.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any healthcare-related queries or support across India
          </p>
        </div>

        {/* Contact Information */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <div className="space-y-1 mb-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Contact Form and Quick Contact */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Appointment Related</option>
                    <option>Billing Question</option>
                    <option>Complaint</option>
                    <option>Suggestion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: +91 1800-123-4567
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp: +91 98765-43210
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Email: support@healthcare-india.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-semibold mb-2">Medical Emergency:</p>
                      <p className="text-red-700">📞 102 (National Ambulance Service)</p>
                      <p className="text-red-700">📞 +91 1800-123-4567 (24/7 Helpline)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Office Locations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Offices Across India</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{office.city}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      {office.address}
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      {office.phone}
                    </p>
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                      {office.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Our team is ready to assist you with all your healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
