'use client'

import { Card } from '@/components/ui/card'
import { BarChart3, TrendingUp, Shield, Zap } from 'lucide-react'

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        {/* 🌟 Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
            <Shield className="h-4 w-4" />
            Features
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-gray-900">
            Expand your reach
          </h2>

          <p className="text-lg text-gray-600">
            Take control of your brand&apos;s visibility and connect with millions of potential customers through every conversation.
          </p>
        </div>

        {/* 💡 Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-delay">
          {/* 🧠 AI-Powered Analytics */}
          <Card className="p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Analytics</h3>
            <p className="text-gray-600">
              Get real-time insights into your business performance with advanced AI algorithms.
            </p>
          </Card>

          {/* 📈 Revenue Optimization */}
          <Card className="p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Revenue Optimization</h3>
            <p className="text-gray-600">
              Maximize your earnings with intelligent cash back strategies and automated savings.
            </p>
          </Card>

          {/* 🔒 Enterprise Security */}
          <Card className="p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Enterprise Security</h3>
            <p className="text-gray-600">
              Bank-grade encryption and security protocols to keep your data safe and compliant.
            </p>
          </Card>

          {/* ⚡ Instant Processing */}
          <Card className="p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Processing</h3>
            <p className="text-gray-600">
              Lightning-fast transactions and real-time updates for your business operations.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
