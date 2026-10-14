"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/utils/GeminiAIModel'
import { Bot, User, Send, LoaderCircle, Sparkles } from 'lucide-react'

function AIAssistantChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello Admin! I am your Professional Interview Assistant. You can test my evaluation logic here.' }
  ])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!userInput.trim()) return

    const newMessages = [...messages, { role: 'user', text: userInput }]
    setMessages(newMessages)
    setUserInput('')
    setLoading(true)

    try {
      const prompt = `Act as a professional technical interviewer. Context: Admin is testing your response logic. Answer the following query professionally: ${userInput}`
      const result = await chatSession.sendMessage(prompt)
      const aiResponse = result.response.text()

      setMessages([...newMessages, { role: 'ai', text: aiResponse }])
    } catch (error) {
      console.error(error)
      setMessages([...newMessages, { role: 'ai', text: "Sorry, I encountered an error processing that request." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold flex items-center gap-2'>
          <Sparkles className='text-yellow-500' /> AI Assistant Playground
        </h1>
        <p className='text-gray-500'>Test and refine the AI's interview persona in real-time.</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bot className='h-4 w-4' /> Live Session: Professional Interviewer Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  {msg.role === 'user' ? <User className='h-4 w-4' /> : <Bot className='h-4 w-4' />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className='flex justify-start'>
               <div className='bg-gray-100 p-4 rounded-2xl flex items-center gap-2'>
                 <LoaderCircle className='h-4 w-4 animate-spin' />
                 <span className='text-sm text-gray-500'>AI is thinking...</span>
               </div>
            </div>
          )}
        </CardContent>
        <div className='p-4 border-t bg-white'>
          <div className='flex gap-2'>
            <Input
              placeholder="Ask the AI something or simulate a user response..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={loading}>
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AIAssistantChat
