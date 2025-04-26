"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, User, LogOut } from "lucide-react"
import { logoutUser } from "@/lib/api"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [pathname])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    window.location.href = "/"
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Update the navItems array to include the Organ Donation link
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Search Blood Donors", href: "/search" },
    { name: "Organ Donation", href: "/organ-donation" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">B+</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">BloodDonate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "text-red-600 dark:text-red-500"
                    : "text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="ml-4 flex items-center space-x-2">
              <ModeToggle />

              {user ? (
                <div className="flex items-center space-x-2">
                  <Link href="/profile">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="default">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.href
                  ? "text-red-600 dark:text-red-500"
                  : "text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
