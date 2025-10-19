'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function CTAFooter() {
  return (
    <>
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Get started with Franco today
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-violet-100 md:text-xl">
            Join thousands of businesses saving money with AI-powered finance.
          </p>
          <Button
            size="lg"
            className="bg-white text-violet-600 hover:bg-gray-100"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="mt-4 text-sm text-violet-200">No credit card required.</p>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-sm text-gray-600">
              © 2024 Franco. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#privacy" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                Privacy
              </a>
              <a href="#terms" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                Terms
              </a>
              <a href="#contact" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
