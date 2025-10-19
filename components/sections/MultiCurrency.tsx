'use client'

import { Card } from '@/components/ui/card'
import { DollarSign, ArrowRightLeft, QrCode } from 'lucide-react'

export default function MultiCurrency() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Grow your money in 3 currencies
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Manage multiple currencies with ease and maximize your international growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="group overflow-hidden border-0 p-8 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 p-4">
              <DollarSign className="h-8 w-8 text-violet-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Currency Exchange</h3>
            <p className="text-gray-600">
              Exchange between USD, EUR, and GBP with competitive rates and zero hidden fees.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="font-medium">USD</span>
                <span className="text-gray-600">$10,450</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="font-medium">EUR</span>
                <span className="text-gray-600">€8,920</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="font-medium">GBP</span>
                <span className="text-gray-600">£7,340</span>
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden border-0 p-8 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-4">
              <ArrowRightLeft className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Secure Transfers</h3>
            <p className="text-gray-600">
              Send and receive money globally with bank-level security and instant processing.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-200 p-4">
                <p className="mb-1 text-sm text-gray-500">Recent Transfer</p>
                <p className="font-semibold">$5,200.00</p>
                <p className="text-sm text-gray-600">to Acme Corp</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Processing time</span>
                <span className="font-medium text-green-600">Instant</span>
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden border-0 p-8 shadow-lg transition-all hover:shadow-xl">
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-4">
              <QrCode className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">QR Payment</h3>
            <p className="text-gray-600">
              Accept payments instantly with QR codes. Perfect for in-person transactions.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 p-8">
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-sm bg-gradient-to-br from-violet-600 to-indigo-600"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">Scan to pay</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
