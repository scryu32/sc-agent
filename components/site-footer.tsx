import Link from "next/link"
import { Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ChatBot</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              An intelligent chatbot platform powered by advanced AI models, designed to provide helpful, creative, and
              technical assistance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-sky-500 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-600 hover:text-sky-500 transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-500 transition-colors flex items-center"
                >
                  <Github className="mr-1 h-4 w-4" />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-sky-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-sky-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} AI ChatBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

