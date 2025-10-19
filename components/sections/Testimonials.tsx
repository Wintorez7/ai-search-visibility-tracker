'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechFlow',
    content: 'Franco has transformed how we manage our business finances. The AI-powered insights save us thousands each month.',
    initials: 'SC'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder, StartupLabs',
    content: 'The automatic cash back optimization is incredible. We are seeing 3x more savings compared to our previous solution.',
    initials: 'MR'
  },
  {
    name: 'Emily Thompson',
    role: 'CFO, GrowthCo',
    content: 'Implementation was seamless and the multi-currency support has been game-changing for our international operations.',
    initials: 'ET'
  },
  {
    name: 'David Kim',
    role: 'Director, InnovatePlus',
    content: 'The integration capabilities are outstanding. Franco works perfectly with all our existing tools and workflows.',
    initials: 'DK'
  }
]

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            This is Why Customers Love Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join thousands of businesses that trust Franco for their financial operations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="group border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
            >
              <Quote className="mb-4 h-8 w-8 text-violet-400" />
              <p className="mb-6 text-gray-700">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-violet-200">
                  <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
