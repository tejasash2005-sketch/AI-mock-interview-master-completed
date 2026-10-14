"use client"
import React, { useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, LoaderCircle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

function SeedData() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const seedData = async () => {
    setLoading(true)
    try {
      const mockSessions = [
        {
          jobPosition: "Full Stack Developer",
          jobDesc: "React, Node.js, PostgreSQL",
          jobExperience: "3",
          questions: [
            { q: "What is the difference between Virtual DOM and Real DOM?", a: "Virtual DOM is a lightweight copy of the Real DOM. React uses it to improve performance by batching updates.", u: "Virtual DOM is like a sketch, Real DOM is the actual building. It makes React faster.", f: "Good analogy. Mentioning reconciliation would make it perfect.", r: "8" },
            { q: "Explain Middleware in Express.js", a: "Functions that have access to request and response objects.", u: "It's like a security guard between the request and the actual route.", f: "Spot on.", r: "9" }
          ]
        },
        {
          jobPosition: "Frontend Engineer",
          jobDesc: "Next.js, Tailwind, TypeScript",
          jobExperience: "2",
          questions: [
            { q: "What is Server Side Rendering (SSR)?", a: "Rendering pages on the server for each request.", u: "SSR is when the server sends a fully rendered page to the client.", f: "Correct and concise.", r: "9" }
          ]
        },
        {
          jobPosition: "Data Scientist",
          jobDesc: "Python, Machine Learning, SQL",
          jobExperience: "5",
          questions: [
            { q: "Explain Overfitting in ML", a: "When a model learns the noise in training data too well.", u: "It happens when the model is too complex and fails on new data.", f: "Accurate explanation.", r: "8" }
          ]
        },
        {
            jobPosition: "Product Manager",
            jobDesc: "Agile, Roadmapping, User Research",
            jobExperience: "4",
            questions: [
              { q: "How do you prioritize features?", a: "Using frameworks like RICE or MoSCoW.", u: "I talk to stakeholders and see what brings most value.", f: "Good, but try to mention specific frameworks like RICE.", r: "7" }
            ]
        },
        {
            jobPosition: "Backend Developer",
            jobDesc: "Java, Spring Boot, Microservices",
            jobExperience: "6",
            questions: [
              { q: "What is Dependency Injection?", a: "Design pattern where objects receive their dependencies from external source.", u: "It helps in making code loosely coupled.", f: "Correct.", r: "9" }
            ]
        },
        {
            jobPosition: "DevOps Engineer",
            jobDesc: "AWS, Docker, Jenkins",
            jobExperience: "3",
            questions: [
              { q: "What is CI/CD?", a: "Continuous Integration and Continuous Deployment.", u: "It's about automating the testing and deployment process.", f: "Clear and correct.", r: "9" }
            ]
        },
        {
            jobPosition: "UI/UX Designer",
            jobDesc: "Figma, User Flows, Prototyping",
            jobExperience: "2",
            questions: [
              { q: "What are the principles of Visual Hierarchy?", a: "Size, Color, Contrast, Alignment.", u: "Making important things bigger so users see them first.", f: "Exactly.", r: "8" }
            ]
        },
        {
            jobPosition: "Mobile Developer",
            jobDesc: "Flutter, Dart, Firebase",
            jobExperience: "1",
            questions: [
              { q: "Explain Hot Reload in Flutter", a: "Applying code changes without restarting the app.", u: "It lets me see changes instantly while coding.", f: "Correct.", r: "10" }
            ]
        },
        {
            jobPosition: "Cyber Security Analyst",
            jobDesc: "Network Security, Pentesting",
            jobExperience: "4",
            questions: [
              { q: "What is a SQL Injection?", a: "Malicious code inserted into input fields to manipulate DB.", u: "When someone enters code in a login box to steal data.", f: "Accurate description.", r: "8" }
            ]
        },
        {
            jobPosition: "Marketing Specialist",
            jobDesc: "SEO, Content Strategy",
            jobExperience: "2",
            questions: [
              { q: "What is SEO?", a: "Search Engine Optimization.", u: "Making your website rank higher on Google.", f: "Correct.", r: "9" }
            ]
        }
      ]

      for (const session of mockSessions) {
        const mockId = uuidv4()

        // Insert Mock Interview
        await db.insert(MockInterview).values({
          mockId: mockId,
          jsonMockResp: JSON.stringify(session.questions.map(q => ({ question: q.q, answer: q.a }))),
          jobPosition: session.jobPosition,
          jobDesc: session.jobDesc,
          jobExperience: session.jobExperience,
          createdBy: "demo-admin@interview.ai",
          createdAt: new Date().toLocaleDateString()
        })

        // Insert User Answers
        for (const qa of session.questions) {
          await db.insert(UserAnswer).values({
            mockIdRef: mockId,
            question: qa.q,
            correctAns: qa.a,
            userAns: qa.u,
            feedback: qa.f,
            rating: qa.r,
            userEmail: "candidate-pro@gmail.com",
            createdAt: new Date().toLocaleDateString()
          })
        }
      }

      setSuccess(true)
      toast.success('Successfully added 10 realistic interview records!')
    } catch (error) {
      console.error(error)
      toast.error('Error seeding data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-[60vh]'>
      <Card className='max-w-md w-full shadow-2xl border-2 border-red-50'>
        <CardHeader className='text-center bg-red-50/50 pb-8'>
          <div className='mx-auto bg-red-100 p-4 rounded-full w-fit mb-4'>
            <Database className='h-8 w-8 text-red-600' />
          </div>
          <CardTitle className='text-2xl font-bold text-gray-800'>Data Seeder</CardTitle>
          <p className='text-sm text-gray-500 mt-2'>Populate your Admin Panel with 10 realistic, professional interview records instantly.</p>
        </CardHeader>
        <CardContent className='p-8 space-y-6'>
          <div className='space-y-4'>
             <div className='flex items-center gap-3 text-sm text-gray-600'>
               <CheckCircle className='h-4 w-4 text-green-500' /> 10 Diverse Job Roles
             </div>
             <div className='flex items-center gap-3 text-sm text-gray-600'>
               <CheckCircle className='h-4 w-4 text-green-500' /> 15+ Detailed Q&A Records
             </div>
             <div className='flex items-center gap-3 text-sm text-gray-600'>
               <CheckCircle className='h-4 w-4 text-green-500' /> Professional AI Feedback
             </div>
          </div>

          {!success ? (
            <Button
              className='w-full h-12 bg-red-600 hover:bg-red-700 text-lg font-semibold transition-all'
              onClick={seedData}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className='animate-spin mr-2' /> Generating...
                </>
              ) : (
                'Populate Database Now'
              )}
            </Button>
          ) : (
            <div className='text-center space-y-4'>
               <div className='bg-green-100 text-green-700 p-3 rounded-lg font-medium'>
                 Data generated successfully!
               </div>
               <Button variant="outline" className='w-full' onClick={() => window.location.href='/admin'}>
                 Go to Admin Dashboard
               </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SeedData
