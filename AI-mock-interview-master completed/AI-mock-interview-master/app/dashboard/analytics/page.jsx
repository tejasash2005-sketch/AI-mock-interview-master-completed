"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { LineChart, BarChart, PieChart, TrendingUp, Award, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function InterviewAnalytics() {
  const { user } = useUser()
  const [stats, setStats] = useState({ total: 0, distinctRoles: 0 })

  useEffect(() => {
    if (user) getAnalytics()
  }, [user])

  const getAnalytics = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))

    const roles = new Set(result.map(i => i.jobPosition))
    setStats({
      total: result.length,
      distinctRoles: roles.size
    })
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center gap-2'>
        <LineChart className='text-red-600' /> Interview Analytics
      </h2>
      <p className='text-gray-500 mb-8'>Data-driven insights from your practice sessions.</p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <Card className="bg-red-50/50 border-red-100">
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><TrendingUp className='h-4 w-4' /> Total Interviews</CardTitle></CardHeader>
          <CardContent><p className='text-3xl font-bold'>{stats.total}</p></CardContent>
        </Card>
        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Award className='h-4 w-4' /> Roles Practiced</CardTitle></CardHeader>
          <CardContent><p className='text-3xl font-bold'>{stats.distinctRoles}</p></CardContent>
        </Card>
        <Card className="bg-green-50/50 border-green-100">
          <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Clock className='h-4 w-4' /> Avg. Confidence</CardTitle></CardHeader>
          <CardContent><p className='text-3xl font-bold'>82%</p></CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <Card>
          <CardHeader><CardTitle>Performance by Category</CardTitle></CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-gray-400">
            [Chart Placeholder - Graphical analysis of Technical vs Behavioral scores]
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Preparation Trend</CardTitle></CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-gray-400">
            [Chart Placeholder - Activity level over the last 30 days]
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default InterviewAnalytics