"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle, Code, HelpCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function TechQuiz() {
  const [tech, setTech] = useState('')
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState(null)

  const generateQuiz = async () => {
    setLoading(true)
    const prompt = `Generate a technical quiz for ${tech} with 5 questions. For each question, provide 4 options and mark the correct one. Format it as a list.`
    const res = await chatSession.sendMessage(prompt)
    setQuiz(res.response.text())
    setLoading(false)
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center gap-2'>
        <Code className='text-green-600' /> Tech Stack Quiz
      </h2>
      <p className='text-gray-500 mb-8'>Test your knowledge on any programming language or framework.</p>

      <div className='max-w-xl flex gap-2 mb-10'>
        <Input placeholder="Enter Tech Stack (e.g. React, Python, AWS)" onChange={(e) => setTech(e.target.value)} />
        <Button className="bg-green-600 hover:bg-green-700" onClick={generateQuiz} disabled={loading || !tech}>
          {loading ? <LoaderCircle className='animate-spin' /> : "Generate Quiz"}
        </Button>
      </div>

      {quiz && (
        <Card className="bg-zinc-50/50">
          <CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle /> Technical Assessment</CardTitle></CardHeader>
          <CardContent>
            <div className='whitespace-pre-wrap text-sm leading-relaxed text-gray-700'>{quiz}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default TechQuiz