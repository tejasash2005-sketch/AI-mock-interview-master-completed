"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle, Users, MessageSquareQuote } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function BehavioralCoach() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const generateQuestion = async () => {
    setLoading(true)
    const prompt = "Generate one common behavioral interview question (STAR method)."
    const res = await chatSession.sendMessage(prompt)
    setQuestion(res.response.text())
    setFeedback(null)
    setLoading(false)
  }

  const getFeedback = async () => {
    setLoading(true)
    const prompt = `Evaluate this behavioral interview answer for the question: "${question}".
    Evaluate using the STAR (Situation, Task, Action, Result) framework.
    Provide a score out of 10 and suggestions for improvement.
    Answer: ${answer}`
    const res = await chatSession.sendMessage(prompt)
    setFeedback(res.response.text())
    setLoading(false)
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center gap-2'>
        <Users className='text-orange-600' /> Behavioral Coach
      </h2>
      <p className='text-gray-500 mb-8'>Master behavioral questions using the STAR method.</p>

      <div className='flex flex-col gap-5'>
        <Button variant="outline" onClick={generateQuestion} disabled={loading}>
          {loading && !question ? <LoaderCircle className='animate-spin mr-2' /> : "Generate New Behavioral Question"}
        </Button>

        {question && (
          <Card className="border-orange-200 bg-orange-50/30">
            <CardHeader><CardTitle className="text-orange-800 flex items-center gap-2"><MessageSquareQuote /> Question:</CardTitle></CardHeader>
            <CardContent><p className='text-lg font-medium'>{question}</p></CardContent>
          </Card>
        )}

        {question && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col gap-4'>
              <label className='font-semibold'>Your Answer (Use STAR framework):</label>
              <Textarea placeholder="Describe your situation, task, action, and result..." className="h-[250px]" onChange={(e) => setAnswer(e.target.value)} />
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={getFeedback} disabled={loading || !answer}>
                {loading ? <LoaderCircle className='animate-spin mr-2' /> : "Get AI Feedback"}
              </Button>
            </div>
            <Card className="bg-zinc-50/50">
              <CardHeader><CardTitle>AI Coaching Feedback</CardTitle></CardHeader>
              <CardContent>
                {feedback ? <div className='whitespace-pre-wrap text-sm leading-relaxed text-gray-700'>{feedback}</div> : <p className='text-gray-400 text-center mt-20'>Feedback will appear here.</p>}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
export default BehavioralCoach