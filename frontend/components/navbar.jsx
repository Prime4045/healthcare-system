"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const navItems = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/doctors", label: "Doctors" },
    { href: "/telemedicine", label: "Telemedicine" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href) => pathname === href

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HealthCare+</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href) ? "text-emerald-600 font-medium" : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.firstName}</span>
                <Link href={user.userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'}>
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${
                    isActive(item.href) ? "text-emerald-600 font-medium" : "text-gray-600 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {user ? (
                  <>
                    <span className="text-gray-700 px-2">Welcome, {user.firstName}</span>
                    <Link href={user.userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard'} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent">
                        Dashboard
                      </Button>
                    </Link>
                    <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}