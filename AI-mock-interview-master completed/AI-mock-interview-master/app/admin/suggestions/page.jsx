"use client"
import React, { useState, useEffect } from 'react'
import { db } from '@/utils/db'
import { AISuggestions } from '@/utils/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Lightbulb, Plus, Trash2, Tag, CheckCircle } from 'lucide-react'

function AISuggestionsManager() {
  const [suggestions, setSuggestions] = useState([])
  const [formData, setFormData] = useState({ category: 'Technical', text: '' })

  useEffect(() => {
    fetchSuggestions()
  }, [])

  const fetchSuggestions = async () => {
    const result = await db.select().from(AISuggestions)
    setSuggestions(result)
  }

  const handleAdd = async () => {
    if (!formData.text) return
    try {
      await db.insert(AISuggestions).values({
        category: formData.category,
        suggestionText: formData.text,
        isActive: 'true'
      })
      toast.success('Professional suggestion added!')
      setFormData({ ...formData, text: '' })
      fetchSuggestions()
    } catch (error) {
      toast.error('Failed to add suggestion')
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold flex items-center gap-2'>
            <Lightbulb className='text-yellow-500' /> AI Suggestions Repository
          </h1>
          <p className='text-gray-500'>Manage professional advice that the AI injects into user feedback.</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <Card className="lg:col-span-1 h-fit">
          <CardHeader><CardTitle>Add New Suggestion</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <div className='space-y-2'>
                <label className='text-sm font-medium'>Category</label>
                <select
                  className='w-full p-2 border rounded-md text-sm'
                  value={formData.category}
                  onChange={(e)=>setFormData({...formData, category: e.target.value})}
                >
                  <option>Technical</option>
                  <option>Behavioral</option>
                  <option>Communication</option>
                  <option>Body Language</option>
                </select>
             </div>
             <div className='space-y-2'>
                <label className='text-sm font-medium'>Professional Advice</label>
                <Textarea
                  rows={4}
                  value={formData.text}
                  onChange={(e)=>setFormData({...formData, text: e.target.value})}
                  placeholder="e.g. Always use the STAR method for behavioral questions..."
                />
             </div>
             <Button className="w-full bg-red-600" onClick={handleAdd}>
               <Plus className='h-4 w-4 mr-2' /> Add to Library
             </Button>
          </CardContent>
        </Card>

        <div className='lg:col-span-2 space-y-4'>
           {suggestions.map((item, index) => (
             <Card key={index}>
               <CardContent className="p-4 flex justify-between items-start">
                 <div className='flex gap-4'>
                    <div className='mt-1'><CheckCircle className='text-green-500 h-5 w-5' /></div>
                    <div>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-700 rounded'>
                          {item.category}
                        </span>
                      </div>
                      <p className='text-gray-700 text-sm'>{item.suggestionText}</p>
                    </div>
                 </div>
                 <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                   <Trash2 className='h-4 w-4' />
                 </Button>
               </CardContent>
             </Card>
           ))}
           {suggestions.length === 0 && (
             <div className='text-center p-10 bg-gray-50 rounded-xl border border-dashed text-gray-400'>
               No custom suggestions added yet.
             </div>
           )}
        </div>
      </div>
    </div>
  )
}

export default AISuggestionsManager
