"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { desc } from 'drizzle-orm'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ClipboardCheck,
  ExternalLink,
  Calendar,
  Briefcase,
  User,
  History
} from 'lucide-react'
import Link from 'next/link'

function InterviewMonitor() {
  const [interviews, setInterviews] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    setLoading(true)
    try {
      const result = await db.select().from(MockInterview).orderBy(desc(MockInterview.id))
      setInterviews(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold flex items-center gap-2'>
          <ClipboardCheck className='text-blue-600' /> Interview Monitor
        </h1>
        <p className='text-gray-500'>Observer view: Track all active and completed mock sessions across the platform.</p>
      </div>

      {loading ? (
        <div className='flex justify-center p-20'>
          <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full'></div>
        </div>
      ) : interviews.length > 0 ? (
        <div className='grid grid-cols-1 gap-4'>
          {interviews.map((interview, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                  <div className='flex gap-4 items-start'>
                    <div className='h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center text-red-600'>
                      <Briefcase className='h-6 w-6' />
                    </div>
                    <div>
                      <h3 className='font-bold text-lg'>{interview.jobPosition}</h3>
                      <div className='flex flex-wrap gap-x-4 gap-y-1 mt-1'>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                          <User className='h-3 w-3' /> {interview.createdBy}
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                          <Calendar className='h-3 w-3' /> {interview.createdAt}
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                          <History className='h-3 w-3' /> {interview.jobExperience} Years Exp.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 w-full md:w-auto'>
                    <div className='text-right hidden md:block mr-4'>
                      <div className='text-xs font-bold text-gray-400 uppercase'>Reference ID</div>
                      <div className='text-sm font-mono'>{interview.mockId.slice(0, 12)}...</div>
                    </div>
                    <Link href={'/admin/interviews/' + interview.mockId}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ExternalLink className='h-4 w-4' /> Full Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='p-20 border-2 border-dashed rounded-2xl text-center bg-white'>
          <Briefcase className='h-12 w-12 text-gray-300 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-600'>No Interviews Found</h2>
          <p className='text-gray-400'>Once users start taking interviews, they will appear here.</p>
        </div>
      )}
    </div>
  )
}

export default InterviewMonitor
