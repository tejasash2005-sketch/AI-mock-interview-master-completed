"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  User,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Award,
  Bot
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

function InterviewDetail() {
  const params = useParams()
  const mockId = params?.mockId
  const [interviewData, setInterviewData] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (mockId) {
      getInterviewDetails()
    }
  }, [mockId])

  const getInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, mockId))

      const answers = await db.select().from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, mockId))

      if (result && result.length > 0) {
        setInterviewData(result[0])
      }
      setUserAnswers(answers || [])
    } catch (error) {
      console.error("Error fetching details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='p-10 flex justify-center items-center h-screen'>
      <div className='animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full'></div>
    </div>
  }

  if (!interviewData) {
    return (
      <div className='p-20 text-center'>
        <XCircle className='h-16 w-16 text-red-500 mx-auto mb-4' />
        <h2 className='text-2xl font-bold'>Interview Not Found</h2>
        <p className='text-gray-500 mb-6'>We couldn't find a session with ID: {mockId}</p>
        <Button onClick={() => router.push('/admin/interviews')}>Return to Monitor</Button>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto pb-10'>
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-red-50">
        <ChevronLeft className='h-4 w-4 mr-2' /> Back to Monitor
      </Button>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Side: Session Overview */}
        <div className='lg:w-1/3 space-y-6'>
          <Card className="border-t-4 border-t-red-600 shadow-md">
            <CardHeader><CardTitle className="text-xl">Session Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <SummaryItem icon={Briefcase} label="Job Position" value={interviewData.jobPosition} />
              <SummaryItem icon={User} label="Candidate" value={interviewData.createdBy} />
              <SummaryItem icon={Calendar} label="Date" value={interviewData.createdAt} />
              <SummaryItem icon={Clock} label="Experience" value={interviewData.jobExperience + " Years"} />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader><CardTitle className="text-sm font-bold uppercase text-gray-400">Job Description</CardTitle></CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600 leading-relaxed'>{interviewData.jobDesc}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Questions and Answers */}
        <div className='lg:w-2/3 space-y-6'>
          <h2 className='text-2xl font-bold flex items-center gap-2'>
            <MessageSquare className='text-red-600' /> Interview Transcript
          </h2>

          {userAnswers.length > 0 ? userAnswers.map((item, index) => (
            <Card key={index} className="overflow-hidden shadow-sm border-l-4 border-l-red-500">
              <div className='bg-gray-50 px-6 py-3 border-b flex justify-between items-center'>
                <span className='font-bold text-gray-500'>Question {index + 1}</span>
                <div className='flex items-center gap-2'>
                  <Award className='h-4 w-4 text-yellow-600' />
                  <span className='text-sm font-bold text-yellow-700'>AI Score: {item.rating}/10</span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className='space-y-1'>
                  <h4 className='font-bold text-lg text-gray-800'>Q: {item.question}</h4>
                </div>

                <div className='grid grid-cols-1 gap-4 mt-4'>
                  <ResponseBlock
                    icon={User}
                    label="Candidate's Response"
                    value={item.userAns}
                    bgColor="bg-blue-50/50"
                    borderColor="border-blue-100"
                    textColor="text-blue-600"
                    isItalic
                  />
                  <ResponseBlock
                    icon={CheckCircle2}
                    label="Expected Answer"
                    value={item.correctAns}
                    bgColor="bg-green-50/50"
                    borderColor="border-green-100"
                    textColor="text-green-600"
                  />
                  <ResponseBlock
                    icon={Bot}
                    label="AI Feedback"
                    value={item.feedback}
                    bgColor="bg-yellow-50/50"
                    borderColor="border-yellow-100"
                    textColor="text-yellow-600"
                    isMedium
                  />
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className='p-10 text-center bg-white rounded-xl border border-dashed shadow-sm'>
              <XCircle className='h-10 w-10 text-gray-300 mx-auto mb-2' />
              <p className='text-gray-500 font-medium'>Transcript unavailable for this session.</p>
              <p className='text-sm text-gray-400'>The user might have abandoned the interview before answering.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0'>
        <Icon className='h-5 w-5 text-gray-600' />
      </div>
      <div>
        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider'>{label}</p>
        <p className='font-semibold text-sm text-gray-800'>{value}</p>
      </div>
    </div>
  )
}

function ResponseBlock({ icon: Icon, label, value, bgColor, borderColor, textColor, isItalic, isMedium }) {
  return (
    <div className={`p-4 ${bgColor} rounded-xl border ${borderColor}`}>
      <p className={`text-[10px] font-bold ${textColor} uppercase mb-2 flex items-center gap-1 tracking-widest`}>
        <Icon className='h-3 w-3' /> {label}
      </p>
      <p className={`text-sm text-gray-700 ${isItalic ? 'italic' : ''} ${isMedium ? 'font-medium' : ''}`}>
        {isItalic ? `"${value}"` : value}
      </p>
    </div>
  )
}

export default InterviewDetail
