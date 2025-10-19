'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

const integrations = [
  { name: 'Notion', color: 'from-gray-600 to-gray-800' },
  { name: 'Slack', color: 'from-purple-500 to-pink-500' },
  { name: 'Zapier', color: 'from-orange-500 to-red-500' },
  { name: 'Airtable', color: 'from-yellow-500 to-orange-500' },
  { name: 'Figma', color: 'from-purple-600 to-pink-600' },
  { name: 'GitHub', color: 'from-gray-700 to-gray-900' },
  { name: 'Trello', color: 'from-blue-500 to-blue-700' },
  { name: 'Asana', color: 'from-red-500 to-pink-500' },
  { name: 'Monday', color: 'from-orange-600 to-red-600' },
  { name: 'ClickUp', color: 'from-purple-500 to-purple-700' },
  { name: 'Jira', color: 'from-blue-600 to-blue-800' },
  { name: 'Stripe', color: 'from-violet-600 to-indigo-600' }
]

export default function Integrations() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Integrate with Existing Workflows
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Connect Franco with the tools you already use and love.
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {integrations.map((integration) => (
            <Card
              key={integration.name}
              className="group flex aspect-square cursor-pointer items-center justify-center border-2 transition-all hover:border-violet-300 hover:shadow-lg"
            >
              <div className="text-center">
                <div className={`mx-auto mb-2 h-12 w-12 rounded-xl bg-gradient-to-br ${integration.color} transition-transform group-hover:scale-110`} />
                <p className="text-sm font-medium">{integration.name}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-violet-200 hover:border-violet-300 hover:bg-violet-50"
          >
            Explore Integrations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
