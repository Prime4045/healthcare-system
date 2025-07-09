import Link from "next/link"
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <Breadcrumb />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our healthcare platform and services.
          </p>
          <p className="text-gray-500 mt-4">Last updated: January 1, 2024</p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fair Terms</h3>
              <p className="text-gray-600 text-sm">Clear and reasonable terms for all users</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
              <p className="text-gray-600 text-sm">Protection of your rights as a patient</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsibilities</h3>
              <p className="text-gray-600 text-sm">Clear guidelines for platform usage</p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                By accessing or using HealthCare+ services, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using our services.
              </p>
              <p>
                These terms apply to all users of the platform, including patients, healthcare providers, and visitors.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
            <div className="space-y-4 text-gray-600">
              <p>HealthCare+ provides a digital platform that connects patients with healthcare providers through:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Online appointment scheduling and management</li>
                <li>Telemedicine and virtual consultation services</li>
                <li>Health record management and storage</li>
                <li>Communication tools between patients and providers</li>
                <li>Billing and payment processing</li>
                <li>Health information and educational resources</li>
              </ul>
              <p>
                Our services are designed to supplement, not replace, the relationship between you and your healthcare
                providers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            <div className="space-y-4 text-gray-600">
              <p>To use our services, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years old or have parental consent</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p>You may not create multiple accounts or share your account with others.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Medical Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-yellow-800">
                  <p className="font-semibold mb-2">Important Medical Disclaimer</p>
                  <p className="text-sm">
                    Our platform facilitates communication with healthcare providers but does not provide medical
                    advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical
                    decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>Key points regarding medical services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We do not practice medicine or provide medical advice</li>
                <li>Healthcare providers on our platform are independent professionals</li>
                <li>Emergency situations require immediate medical attention (call 911)</li>
                <li>Telemedicine has limitations and may not be suitable for all conditions</li>
                <li>You are responsible for following your healthcare provider's instructions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Responsibilities</h2>
            <div className="space-y-4 text-gray-600">
              <p>As a user of our platform, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate health information to healthcare providers</li>
                <li>Attend scheduled appointments or cancel with appropriate notice</li>
                <li>Pay for services as agreed</li>
                <li>Respect healthcare providers and other users</li>
                <li>Use the platform only for legitimate healthcare purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain the confidentiality of other users' information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
            <div className="space-y-4 text-gray-600">
              <p>You may not use our platform to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any laws or regulations</li>
                <li>Impersonate others or provide false information</li>
                <li>Harass, abuse, or harm other users or providers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Distribute malware or engage in hacking activities</li>
                <li>Use automated systems to access our services</li>
                <li>Sell or transfer your account to others</li>
                <li>Engage in fraudulent activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
            <div className="space-y-4 text-gray-600">
              <p>Payment terms and conditions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fees are due at the time of service unless otherwise arranged</li>
                <li>We accept major credit cards and insurance plans</li>
                <li>Cancellation fees may apply for late cancellations</li>
                <li>Refunds are processed according to our refund policy</li>
                <li>You are responsible for any applicable taxes</li>
                <li>Insurance coverage is subject to your plan's terms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Your privacy is important to us. Our collection and use of your information is governed by our Privacy
                Policy, which is incorporated into these terms by reference.
              </p>
              <p>Key privacy commitments:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HIPAA compliance for all health information</li>
                <li>Secure encryption of all data transmissions</li>
                <li>Limited sharing only as necessary for your care</li>
                <li>Your right to access and control your information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-600">
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We provide our platform "as is" without warranties</li>
                <li>We are not liable for medical outcomes or decisions</li>
                <li>Our liability is limited to the amount you paid for services</li>
                <li>We are not responsible for third-party content or services</li>
                <li>Healthcare providers are independent contractors</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <div className="space-y-4 text-gray-600">
              <p>Either party may terminate your account:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may close your account at any time</li>
                <li>We may suspend or terminate accounts for violations</li>
                <li>Termination does not affect existing obligations</li>
                <li>You may request deletion of your data upon termination</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <div className="space-y-4 text-gray-600">
              <p>We may update these terms from time to time. We will notify you of material changes by:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting updated terms on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our platform</li>
              </ul>
              <p>Continued use of our services after changes indicates acceptance of the new terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                These terms are governed by the laws of the State of New York, without regard to conflict of law
                principles. Any disputes will be resolved in the courts of New York.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>If you have questions about these terms, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> legal@healthcare-plus.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Mail:</strong> HealthCare+ Legal Department
                  <br />
                  123 Healthcare Ave
                  <br />
                  Medical District, NY 10001
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
          <p className="text-gray-600 mb-6">
            Our legal team is available to help clarify any questions about our terms of service.
          </p>
          <Link href="/contact">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium">
              Contact Legal Team
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
