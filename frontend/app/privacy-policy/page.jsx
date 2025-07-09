import Link from "next/link"
import { Shield, Lock, Eye, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import Navbar from "@/components/navbar"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <Breadcrumb />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-gray-500 mt-4">Last updated: January 1, 2024</p>
        </div>

        {/* Privacy Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600 text-sm">We follow strict healthcare privacy regulations</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparent</h3>
              <p className="text-gray-600 text-sm">Clear information about data collection and use</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Control</h3>
              <p className="text-gray-600 text-sm">You control your data and privacy settings</p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-600">
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create an account or update your profile</li>
                <li>Schedule appointments or use our services</li>
                <li>Communicate with healthcare providers</li>
                <li>Contact our support team</li>
                <li>Participate in surveys or feedback</li>
              </ul>
              <p>This information may include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal identifiers (name, email, phone number)</li>
                <li>Health information and medical history</li>
                <li>Insurance and billing information</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our healthcare services</li>
                <li>Process appointments and facilitate communication with providers</li>
                <li>Send you important updates about your care</li>
                <li>Process payments and insurance claims</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Protect against fraud and ensure platform security</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
            <div className="space-y-4 text-gray-600">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Healthcare Providers:</strong> With doctors and medical staff involved in your care
                </li>
                <li>
                  <strong>Insurance Companies:</strong> For billing and claims processing
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect rights and safety
                </li>
                <li>
                  <strong>Service Providers:</strong> With trusted partners who help us operate our platform
                </li>
                <li>
                  <strong>Emergency Situations:</strong> To protect your health and safety
                </li>
              </ul>
              <p>We never sell your personal health information to third parties for marketing purposes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>We implement comprehensive security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security audits and compliance checks</li>
                <li>Staff training on privacy and security protocols</li>
                <li>HIPAA-compliant data handling procedures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-600">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request a copy of your personal information
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to another provider
                </li>
                <li>
                  <strong>Restriction:</strong> Limit how we use your information
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain uses of your information
                </li>
              </ul>
              <p>To exercise these rights, please contact us at privacy@healthcare-plus.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-600">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and features</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal information
                from children under 13. If we become aware that we have collected such information, we will take steps
                to delete it promptly.
              </p>
              <p>For minors between 13-18, we require parental consent before collecting any personal information.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your information in accordance with this privacy policy
                and applicable laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-600">
              <p>We may update this privacy policy from time to time. We will notify you of any material changes by:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the updated policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a prominent notice on our platform</li>
              </ul>
              <p>
                Your continued use of our services after any changes indicates your acceptance of the updated policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <div className="space-y-4 text-gray-600">
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> privacy@healthcare-plus.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Mail:</strong> HealthCare+ Privacy Office
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h2>
          <p className="text-gray-600 mb-6">
            Our privacy team is here to help you understand how we protect your information.
          </p>
          <Link href="/contact">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium">
              Contact Privacy Team
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
