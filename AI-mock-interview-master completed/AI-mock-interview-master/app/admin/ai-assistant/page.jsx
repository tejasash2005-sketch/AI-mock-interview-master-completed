"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Bot, Sparkles, Zap, BrainCircuit, Save } from 'lucide-react'

function AIAssistantConfig() {
  const [config, setConfig] = useState({
    assistantName: 'Interview Pro AI',
    tone: 'Professional & Encouraging',
    model: 'Gemini 1.5 Flash',
    systemPrompt: 'You are an expert technical interviewer. Provide critical yet constructive feedback. Focus on both soft skills and technical accuracy.',
    autoCorrection: true
  })

  const handleSave = () => {
    toast.success('AI Personality updated successfully!')
  }

  return (
    <div className='max-w-4xl'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold flex items-center gap-2'>
          <Bot className='text-red-600 h-8 w-8' /> AI Assistant Configuration
        </h1>
        <p className='text-gray-500'>Control the persona, tone, and intelligence of your interview AI.</p>
      </div>

      <div className='grid grid-cols-1 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BrainCircuit className='h-5 w-5' /> Core Personality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className='grid grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Assistant Display Name</label>
                <Input value={config.assistantName} onChange={(e)=>setConfig({...config, assistantName: e.target.value})} />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>AI Model Selection</label>
                <Input value={config.model} disabled />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>System Instructions (Prompt Tuning)</label>
              <Textarea
                rows={5}
                value={config.systemPrompt}
                onChange={(e)=>setConfig({...config, systemPrompt: e.target.value})}
                placeholder="Enter detailed instructions for the AI behavior..."
              />
              <p className='text-xs text-gray-400'>This prompt defines how the AI interacts and evaluates users.</p>
            </div>

            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center gap-3'>
                <Zap className='text-orange-500' />
                <div>
                  <h4 className='font-semibold text-sm'>Auto-Feedback Refinement</h4>
                  <p className='text-xs text-gray-500'>Automatically correct common AI hallucinations in feedback.</p>
                </div>
              </div>
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${config.autoCorrection ? 'bg-red-600' : 'bg-gray-300'}`}
                onClick={() => setConfig({...config, autoCorrection: !config.autoCorrection})}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${config.autoCorrection ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className='h-5 w-5 text-yellow-500' /> Skill Weighting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <WeightSlider label="Technical Accuracy" value={85} />
              <WeightSlider label="Communication Skills" value={70} />
              <WeightSlider label="Confidence & Body Language" value={50} />
              <WeightSlider label="Problem Solving Logic" value={90} />
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={handleSave}>
            <Save className='mr-2 h-4 w-4' /> Deploy AI Configuration
          </Button>
        </div>
      </div>
    </div>
  )
}

function WeightSlider({ label, value }) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-sm'>
        <span>{label}</span>
        <span className='font-bold text-primary'>{value}%</span>
      </div>
      <div className='h-2 bg-gray-100 rounded-full'>
        <div className='h-2 bg-red-600 rounded-full' style={{width: `${value}%`}}></div>
      </div>
    </div>
  )
}

export default AIAssistantConfig
