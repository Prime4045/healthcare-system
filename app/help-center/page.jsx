"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Search, HelpCircle, Book, Phone, MessageCircle, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Add the imports at the top
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFaq, setExpandedFaq] = useState(null)

  const categories = [
    {
      icon: Calendar,
      title: "Appointments",
      description: "Booking, rescheduling, and managing appointments",
      articles: 12,
    },
    {
      icon: Phone,
      title: "Telemedicine",
      description: "Virtual consultations and video calls",
      articles: 8,
    },
    {
      icon: Book,
      title: "Account Management",
      description: "Profile settings, passwords, and preferences",
      articles: 15,
    },
    {
      icon: MessageCircle,
      title: "Billing & Insurance",
      description: "Payment methods, insurance claims, and billing",
      articles: 10,
    },
  ]

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment by logging into your account, selecting 'Book Appointment', choosing your preferred doctor and specialty, then selecting an available time slot. You'll receive a confirmation email once your appointment is booked.",
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer:
        "Yes, you can reschedule or cancel appointments up to 24 hours before your scheduled time. Go to 'My Appointments' in your dashboard and select the appointment you want to modify. Please note that cancellations within 24 hours may incur a fee.",
    },
    {
      question: "How do I join a telemedicine appointment?",
      answer:
        "For telemedicine appointments, you'll receive an email with a secure link 30 minutes before your appointment. Click the link to join the video call. Make sure you have a stable internet connection and a device with a camera and microphone.",
    },
    {
      question: "What insurance plans do you accept?",
      answer:
        "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and Medicare. Please check with your insurance provider to confirm coverage for telemedicine services.",
    },
    {
      question: "How can I access my medical records?",
      answer:
        "Your medical records are available in your patient portal. Log into your account and navigate to 'Health Records' to view your test results, prescriptions, and visit summaries. You can also download or share these records with other healthcare providers.",
    },
    {
      question: "What should I do in case of a medical emergency?",
      answer:
        "For life-threatening emergencies, call 911 immediately. For urgent but non-emergency situations, you can call our 24/7 emergency line at +1 (555) 911-HELP or use our urgent care telemedicine service.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "To update your personal information, log into your account and go to 'Profile Settings'. You can update your contact information, emergency contacts, insurance details, and communication preferences.",
    },
    {
      question: "Are my medical records secure?",
      answer:
        "Yes, we take your privacy seriously. All medical records are encrypted and stored securely in compliance with HIPAA regulations. Only authorized healthcare providers involved in your care can access your information.",
    },
  ]

  const quickLinks = [
    { title: "Book an Appointment", link: "/register" },
    { title: "Patient Portal Login", link: "/login" },
    { title: "Find a Doctor", link: "/doctors" },
    { title: "Telemedicine Services", link: "/telemedicine" },
    { title: "Contact Support", link: "/contact" },
    { title: "Billing Questions", link: "/contact" },
  ]

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to your questions and get the support you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <span className="text-emerald-600 font-medium">{category.articles} articles</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.link}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{link.title}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3">
                Contact Support
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 bg-transparent"
            >
              Live Chat
            </Button>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Phone Support</div>
              <div className="text-gray-600">+1 (555) 123-4567</div>
              <div className="text-emerald-600 text-sm">24/7 Available</div>
            </div>
            <div>
              <MessageCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Live Chat</div>
              <div className="text-gray-600">Available on website</div>
              <div className="text-emerald-600 text-sm">Mon-Fri 8AM-8PM</div>
            </div>
            <div>
              <HelpCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="font-semibold text-gray-900">Email Support</div>
              <div className="text-gray-600">support@healthcare-plus.com</div>
              <div className="text-emerald-600 text-sm">Response within 2 hours</div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
