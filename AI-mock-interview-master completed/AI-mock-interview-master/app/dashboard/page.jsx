import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import Interviewlist from './_components/Interviewlist'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  FileText,
  Target,
  Users,
  Code,
  LineChart,
  MapIcon,
  Sparkles
} from 'lucide-react'

import Link from 'next/link'

function Dashboard() {
  const advancedModules = [
    {
      title: "AI Resume Analyzer",
      description: "Upload your resume and get AI-powered improvement suggestions.",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
      path: "/dashboard/resume-analyzer"
    },
    {
      title: "Job Fitment Score",
      description: "Check how well your profile matches a specific job description.",
      icon: Target,
      color: "text-purple-600",
      bg: "bg-purple-100",
      path: "/dashboard/job-fitment"
    },
    {
      title: "Behavioral Coach",
      description: "Practice STAR method questions with real-time AI coaching.",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-100",
      path: "/dashboard/behavioral-coach"
    },
    {
      title: "Tech Stack Quiz",
      description: "Test your technical knowledge with AI-generated role-based quizzes.",
      icon: Code,
      color: "text-green-600",
      bg: "bg-green-100",
      path: "/dashboard/tech-quiz"
    },
    {
      title: "Interview Analytics",
      description: "Detailed insights into your performance and confidence growth.",
      icon: LineChart,
      color: "text-red-600",
      bg: "bg-red-100",
      path: "/dashboard/analytics"
    },
    {
      title: "AI Career Roadmap",
      description: "Personalized learning paths based on your interview performance.",
      icon: MapIcon,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      path: "/dashboard/roadmap"
    }
  ];

  return (
    <div className='p-10'>
      <div className='flex items-center gap-2 mb-2'>
        <h2 className='font-bold text-3xl'>Dashboard</h2>
        <Sparkles className='text-primary animate-pulse' />
      </div>
      <h2 className='text-gray-500'>Create and Start AI Mockup Interview, or explore advanced tools</h2>

      {/* Main Action: Add New Interview */}
      <div className='grid grid-cols-1 md:grid-cols-3 my-8'>
        <AddNewInterview/>
      </div>

      {/* Advanced AI Modules Section */}
      <div className='mb-10'>
        <h3 className='font-bold text-xl mb-5 flex items-center gap-2'>
          Advanced AI Tools <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'>Beta</span>
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {advancedModules.map((module, index) => (
            <Link href={module.path} key={index}>
              <Card className="hover:shadow-lg transition-all cursor-pointer border-none bg-zinc-50/50 h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className={`p-3 rounded-xl ${module.bg}`}>
                    <module.icon className={`h-6 w-6 ${module.color}`} />
                  </div>
                  <div className='flex flex-col'>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">{module.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Previous Interview list */}
      <div className='mt-10'>
        <h3 className='font-bold text-xl mb-5'>Previous Mock Interviews</h3>
        <Interviewlist/>
      </div>
    </div>
  )
}

export default Dashboard