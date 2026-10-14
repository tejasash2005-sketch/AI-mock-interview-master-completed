"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer, AdminUsers } from '@/utils/schema'
import { count, desc } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  Video,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInterviews: 0,
    totalAnswers: 0,
    recentSessions: []
  })

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    // In a real app, we might need a separate users table or Clerk API call for total users
    // For now, let's count unique emails from MockInterview
    const interviews = await db.select().from(MockInterview)
    const answers = await db.select().from(UserAnswer)

    const uniqueUsers = new Set(interviews.map(i => i.createdBy)).size

    setStats({
      totalUsers: uniqueUsers,
      totalInterviews: interviews.length,
      totalAnswers: answers.length,
      recentSessions: interviews.sort((a,b) => b.id - a.id).slice(0, 5)
    })
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-2'>Overview</h1>
      <p className='text-gray-500 mb-8'>System status and key metrics across the platform.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Interviews Conducted" value={stats.totalInterviews} icon={Video} color="text-purple-600" bg="bg-purple-50" />
        <StatCard title="Questions Answered" value={stats.totalAnswers} icon={CheckCircle2} color="text-green-600" bg="bg-green-50" />
        <StatCard title="Platform Growth" value="+12%" icon={TrendingUp} color="text-orange-600" bg="bg-orange-50" />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
           <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Interview Sessions</CardTitle>
                <ArrowUpRight className='h-4 w-4 text-gray-400' />
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {stats.recentSessions.map((session, index) => (
                    <div key={index} className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors'>
                      <div className='flex items-center gap-4'>
                        <div className='h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold'>
                          {session.jobPosition.charAt(0)}
                        </div>
                        <div>
                          <h4 className='font-semibold'>{session.jobPosition}</h4>
                          <p className='text-sm text-gray-500'>{session.createdBy}</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-sm font-medium'>ID: {session.mockId.slice(0, 8)}</div>
                        <div className='text-xs text-gray-400 flex items-center gap-1 justify-end'>
                          <Clock className='h-3 w-3' /> {session.createdAt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
           </Card>
        </div>

        <div>
           <Card className="h-full">
              <CardHeader><CardTitle>AI Performance Monitor</CardTitle></CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span>Accuracy Rate</span>
                      <span className='font-bold'>94%</span>
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-2'>
                      <div className='bg-green-500 h-2 rounded-full' style={{width: '94%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className='flex justify-between text-sm mb-2'>
                      <span>Latency (avg)</span>
                      <span className='font-bold'>1.2s</span>
                    </div>
                    <div className='w-full bg-gray-100 rounded-full h-2'>
                      <div className='bg-blue-500 h-2 rounded-full' style={{width: '30%'}}></div>
                    </div>
                  </div>
                  <div className='pt-4 border-t'>
                    <h4 className='font-semibold text-sm mb-3'>System Health</h4>
                    <div className='flex gap-2 items-center text-green-600 text-sm'>
                      <div className='h-2 w-2 rounded-full bg-green-600 animate-pulse'></div>
                      Database: Online
                    </div>
                    <div className='flex gap-2 items-center text-green-600 text-sm mt-1'>
                      <div className='h-2 w-2 rounded-full bg-green-600 animate-pulse'></div>
                      Gemini API: Stable
                    </div>
                  </div>
                </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color, bg }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className='flex items-center gap-4'>
          <div className={`p-3 rounded-xl ${bg} ${color}`}>
            <Icon className='h-6 w-6' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>{title}</p>
            <h3 className='text-2xl font-bold'>{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminDashboard
