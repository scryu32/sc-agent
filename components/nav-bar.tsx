"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { Menu, X, Github } from "lucide-react"

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ScAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/docs" className="text-gray-600 hover:text-sky-500 transition-colors">
              Docs
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-500 transition-colors flex items-center"
            >
              <Github className="mr-1 h-4 w-4" />
              GitHub
            </Link>
            <Link href="/chat">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">Chat Now</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/docs"
              className="block py-2 text-gray-600 hover:text-sky-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-gray-600 hover:text-sky-500 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Github className="mr-1 h-4 w-4" />
              GitHub
            </Link>
            <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Chat Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

