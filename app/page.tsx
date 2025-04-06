import Link from "next/link"
import { Button } from "../components/ui/button"
import { NavBar } from "../components/nav-bar"
import { SiteFooter } from "../components/site-footer"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="py-20 md:py-28 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Intelligent Conversations with AI
                </h1>
                <p className="text-xl text-gray-600 max-w-md">
                  Experience seamless interactions with our advanced AI chatbots designed to assist, create, and solve
                  problems.
                </p>
                <div className="pt-4">
                  <Link href="/chat">
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg rounded-md">
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src={"/placeholder.svg"} alt={"bot"} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Multiple AI Personalities",
                  description: "Choose from various AI bots, each with unique capabilities and expertise",
                },
                {
                  title: "Real-time Responses",
                  description: "Experience fluid conversations with streaming technology for immediate feedback",
                },
                {
                  title: "Intuitive Interface",
                  description: "Clean, minimalist design focused on making AI interactions simple and effective",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:border-sky-300 transition-colors"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-sky-500 text-xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Project</h2>
            <p className="text-gray-600 mb-8">
              This AI chatbot platform demonstrates the capabilities of modern language models in creating meaningful,
              context-aware conversations. Built with Next.js and the AI SDK, it provides a seamless interface for
              interacting with different AI personalities.
            </p>
            <p className="text-gray-600">
              Whether you're looking for creative inspiration, technical assistance, or general help, our AI chatbots
              are designed to provide valuable responses tailored to your needs.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

