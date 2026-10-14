"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle, Target, Sparkles } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function JobFitment() {
  const [resume, setResume] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const checkFitment = async () => {
    setLoading(true)
    const prompt = `Compare the following Resume and Job Description.
    1. Provide a Fitment Percentage (e.g. 85%)
    2. List Matching Skills
    3. List Gap Skills (missing in resume but in JD)
    4. Provide a "How to land this job" tip.
    Resume: ${resume}
    Job Description: ${jobDesc}`

    try {
      const res = await chatSession.sendMessage(prompt)
      setResult(res.response.text())
    } catch (error) {
      console.error(error)
      setResult("Error calculating score.")
    }
    setLoading(false)
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center gap-2'>
        <Target className='text-purple-600' /> Job Fitment Score
      </h2>
      <p className='text-gray-500 mb-8'>See how well your resume matches a specific job role.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col gap-4'>
          <Textarea placeholder="Paste your Resume text here..." className="h-[200px]" onChange={(e) => setResume(e.target.value)} />
          <Textarea placeholder="Paste the Job Description here..." className="h-[200px]" onChange={(e) => setJobDesc(e.target.value)} />
          <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading || !resume || !jobDesc} onClick={checkFitment}>
            {loading ? <><LoaderCircle className='animate-spin mr-2' /> Calculating...</> : "Check Fitment Score"}
          </Button>
        </div>

        <Card className="bg-zinc-50/50">
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className='text-yellow-500' /> AI Match Report</CardTitle></CardHeader>
          <CardContent>
            {result ? <div className='whitespace-pre-wrap text-sm leading-relaxed text-gray-700'>{result}</div> : <p className='text-gray-400 text-center mt-20'>Score and analysis will appear here.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default JobFitment