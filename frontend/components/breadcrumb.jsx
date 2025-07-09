"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumb() {
  const pathname = usePathname()

  // Don't show breadcrumb on home page
  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/")
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return { label, href }
    }),
  ]

  return (
    <nav className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {index < breadcrumbItems.length - 1 ? (
                <Link href={item.href} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}