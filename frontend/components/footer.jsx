import Link from "next/link"
import { Calendar } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">HealthCare+</span>
            </div>
            <p className="text-gray-400">Your trusted partner in healthcare management and appointment booking.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services/online-booking" className="hover:text-white transition-colors">
                  Online Booking
                </Link>
              </li>
              <li>
                <Link href="/services/health-records" className="hover:text-white transition-colors">
                  Health Records
                </Link>
              </li>
              <li>
                <Link href="/telemedicine" className="hover:text-white transition-colors">
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link href="/services/prescription" className="hover:text-white transition-colors">
                  Prescription
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help-center" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: +91 1800-123-4567</li>
              <li>Email: support@healthcare-plus.com</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HealthCare+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}