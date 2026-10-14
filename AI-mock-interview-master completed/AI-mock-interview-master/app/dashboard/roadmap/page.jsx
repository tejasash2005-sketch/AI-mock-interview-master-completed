"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle, MapIcon, Route } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function CareerRoadmap() {
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)

  const generateRoadmap = async () => {
    setLoading(true)
    const prompt = `Create a 6-month career roadmap to become a ${role}.
    Break it down month-by-month.
    Include:
    1. Key technologies to learn
    2. Suggested projects
    3. Certification recommendations
    4. Soft skills to focus on.`

    const res = await chatSession.sendMessage(prompt)
    setRoadmap(res.response.text())
    setLoading(false)
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center gap-2'>
        <MapIcon className='text-indigo-600' /> AI Career Roadmap
      </h2>
      <p className='text-gray-500 mb-8'>Get a personalized, month-by-month plan to land your dream role.</p>

      <div className='max-w-xl flex gap-2 mb-10'>
        <Input placeholder="Target Job Role (e.g. Senior Frontend Engineer, DevOps)" onChange={(e) => setRole(e.target.value)} />
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={generateRoadmap} disabled={loading || !role}>
          {loading ? <LoaderCircle className='animate-spin' /> : "Generate Roadmap"}
        </Button>
      </div>

      {roadmap && (
        <Card className="bg-zinc-50/50">
          <CardHeader><CardTitle className="flex items-center gap-2"><Route className='text-indigo-600'/> Your Success Path</CardTitle></CardHeader>
          <CardContent>
            <div className='whitespace-pre-wrap text-sm leading-relaxed text-gray-700'>{roadmap}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default CareerRoadmap