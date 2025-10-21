"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Download, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 py-16 md:py-24">
      {/*  Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/30 via-purple-300/20 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />

      {/* Main Container */}
      <div className="container relative z-10 mx-auto px-6">
        {/*  Hero Text Content */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 text-sm font-medium text-foreground mb-6 shadow-sm">
            <Sparkles className="h-5 w-6 text-purple-500" />
            Gain a competitive edge
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text- 7xl mb-6 text-gray-900">
            Rank higher on <br /> AI search engines
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            AED Tracker is an AI-powered dashboard that enhances your brand
            visibility across ChatGPT, Bard, Perplexity, and more.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* <Button size="lg" className="shadow-medium transition-bounce hover:scale-105">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button> */}
            <Link href="/sign-up">
              <Button size="lg" className="shadow-medium transition-bounce hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="transition-smooth hover:bg-secondary hover:text-black"
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border-2 border-current" />
                Live Demo
              </div>
            </Button>
          </div>
        </div>

        {/* 🧾 Dashboard Cards Section */}
        <div className="grid gap-6 lg:grid-cols-[350px_1fr] max-w-6xl mx-auto animate-fade-in-delay">
          {/* 👤 User Card */}
          <Card className="p-6 shadow-lg border border-gray-100 bg-white/90 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                <div>
                  <p className="font-semibold text-gray-900">Alessandra Corp</p>
                  <p className="text-sm text-gray-500">
                    atlas@andre@example.com
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Ranking
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-gray-900">#25</span>
                  <span className="text-sm text-gray-500">of 5000</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 transition-all hover:bg-gray-50">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <div className="text-center">
                    <p className="text-xs text-gray-700 font-medium">
                      Bank Transfer
                    </p>
                    <p className="text-xs text-gray-400">Regnantlimas</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 transition-all hover:bg-gray-50">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <div className="text-center">
                    <p className="text-xs text-gray-700 font-medium">
                      Card Payment
                    </p>
                    <p className="text-xs text-gray-400">Comprise Loon</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Pay Now
              </Button>
            </div>
          </Card>

          {/* 📊 Dashboard Chart Card */}
          <Card className="p-6 shadow-lg border border-gray-100 bg-white/90 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">AED Dashboard</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                      $34,743.00
                    </h3>
                    <span className="text-sm font-medium text-green-600">
                      +6.5%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5">
                    <option>Mar 30 - Mar 5</option>
                  </select>
                </div>
              </div>

              <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-purple-50/30">
                <Image
                  src="/assets/dashboard-chart.png"
                  alt="Revenue analytics chart showing business growth"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
