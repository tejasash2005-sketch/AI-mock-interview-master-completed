"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { UserAnswer, FeedbackCorrections } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Search, Edit3, Save, CheckCircle } from 'lucide-react'

function FeedbackCorrection() {
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [correction, setCorrection] = useState({ feedback: '', rating: '' })

  useEffect(() => {
    fetchAnswers()
  }, [])

  const fetchAnswers = async () => {
    setLoading(true)
    const result = await db.select().from(UserAnswer).orderBy(desc(UserAnswer.id))
    setAnswers(result)
    setLoading(false)
  }

  const handleEdit = (ans) => {
    setEditingId(ans.id)
    setCorrection({ feedback: ans.feedback, rating: ans.rating })
  }

  const saveCorrection = async (ansId) => {
    try {
      // Save to correction table
      await db.insert(FeedbackCorrections).values({
        userAnswerId: ansId,
        correctedFeedback: correction.feedback,
        correctedRating: correction.rating,
        createdAt: new Date().toLocaleDateString()
      })

      // Also update main table for immediate effect
      await db.update(UserAnswer)
        .set({ feedback: correction.feedback, rating: correction.rating })
        .where(eq(UserAnswer.id, ansId))

      toast.success('Feedback corrected successfully!')
      setEditingId(null)
      fetchAnswers()
    } catch (error) {
      toast.error('Failed to save correction')
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Feedback Corrections</h1>
          <p className='text-gray-500'>Refine and perfect AI-generated feedback for users.</p>
        </div>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
          <Input placeholder="Search by email..." className="pl-10 w-64" />
        </div>
      </div>

      <div className='space-y-6'>
        {loading ? (
          <p>Loading answers...</p>
        ) : (
          answers.map((ans, index) => (
            <Card key={index} className="overflow-hidden">
              <div className='bg-gray-50 p-4 border-b flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-600'>User: {ans.userEmail}</span>
                <span className='text-xs text-gray-400'>{ans.createdAt}</span>
              </div>
              <CardContent className="p-6">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='font-bold text-red-600 mb-2'>Q: {ans.question}</h3>
                    <div className='p-3 bg-blue-50 rounded-lg text-sm italic'>
                      <strong>User Answer:</strong> {ans.userAns}
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between items-center mb-2'>
                       <h4 className='font-semibold'>Feedback & Rating</h4>
                       {editingId !== ans.id && (
                         <Button variant="ghost" size="sm" onClick={() => handleEdit(ans)}>
                           <Edit3 className='h-4 w-4 mr-1' /> Edit
                         </Button>
                       )}
                    </div>

                    {editingId === ans.id ? (
                      <div className='space-y-4'>
                        <Input
                          placeholder="Rating (1-10)"
                          value={correction.rating}
                          onChange={(e)=>setCorrection({...correction, rating: e.target.value})}
                        />
                        <Textarea
                          rows={4}
                          value={correction.feedback}
                          onChange={(e)=>setCorrection({...correction, feedback: e.target.value})}
                        />
                        <div className='flex gap-2'>
                          <Button size="sm" onClick={() => saveCorrection(ans.id)}>
                            <Save className='h-4 w-4 mr-2' /> Save Changes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className='space-y-3'>
                        <div className='flex items-center gap-2'>
                          <span className='px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md font-bold text-xs'>
                            Rating: {ans.rating}
                          </span>
                        </div>
                        <p className='text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-dashed'>
                          {ans.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default FeedbackCorrection
