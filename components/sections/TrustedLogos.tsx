'use client'

import { Circle } from 'lucide-react'

const logos = [
  { name: 'Medium', icon: 'M' },
  { name: 'copilot', icon: 'C' },
  { name: 'Factor', icon: 'F' },
  { name: 'Jasper', icon: 'J' },
  { name: 'Jasper', icon: 'J' }
]

export default function TrustedLogos() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 text-gray-400">
            <Circle className="h-5 w-5" fill="currentColor" />
            <span className="text-base font-medium">Features</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Expand your reach
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
            Take control of your brand's visibility and connect with millions of potential customers through every conversation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 pt-8 md:gap-16 lg:gap-20">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-3 opacity-40 transition-opacity hover:opacity-70"
            >
              <Circle className="h-8 w-8 fill-gray-600" />
              <span className="text-2xl font-semibold text-gray-600">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
