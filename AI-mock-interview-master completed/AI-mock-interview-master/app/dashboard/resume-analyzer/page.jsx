"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle, FileText, Sparkles } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const analyzeResume = async () => {
    setLoading(true)
    const prompt = `Analyze the following resume text and provide:
    1. Professional Summary feedback
    2. Key Skills found
    3. Missing critical keywords for general software roles
    4. Improvement suggestions for formatting and impact.
    Format the response in clear sections.
    Resume Text: ${resumeText}`

    try {
      const res = await chatSession.sendMessage(prompt)
      setResult(res.response.text())
    } catch (error) {
      console.error(error)
      setResult("Error analyzing resume. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center gap-2'>
        <FileText className='text-blue-600' /> AI Resume Analyzer
      </h2>
      <p className='text-gray-500 mb-8'>Paste your resume content below to get instant AI feedback.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
          <Textarea
            placeholder="Paste your resume text here..."
            className="h-[400px]"
            onChange={(e) => setResumeText(e.target.value)}
          />
          <Button
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700"
            disabled={loading || !resumeText}
            onClick={analyzeResume}
          >
            {loading ? <><LoaderCircle className='animate-spin mr-2' /> Analyzing...</> : "Analyze Resume"}
          </Button>
        </div>

        <Card className="bg-zinc-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className='text-yellow-500' /> AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className='whitespace-pre-wrap text-sm leading-relaxed text-gray-700'>
                {result}
              </div>
            ) : (
              <p className='text-gray-400 text-center mt-20'>Results will appear here after analysis.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResumeAnalyzer