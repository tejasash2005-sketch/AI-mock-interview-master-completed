"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/db'
import { AdminUsers } from '@/utils/schema'
import { toast } from 'sonner'
import { ShieldAlert, UserPlus, Server, Key, Database } from 'lucide-react'

function SystemSettings() {
  const [newAdminEmail, setNewAdminEmail] = useState('')

  const handleAddAdmin = async () => {
    if (!newAdminEmail) return
    try {
      await db.insert(AdminUsers).values({
        email: newAdminEmail,
        name: newAdminEmail.split('@')[0],
        role: 'admin',
        createdAt: new Date().toLocaleDateString()
      })
      toast.success('New administrator added successfully!')
      setNewAdminEmail('')
    } catch (error) {
      toast.error('Error adding admin. Email might already exist.')
    }
  }

  return (
    <div className='max-w-4xl'>
      <h1 className='text-3xl font-bold mb-8'>System Settings</h1>

      <div className='grid gap-8'>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className='h-5 w-5 text-red-600' /> Administrative Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <p className='text-sm text-gray-500'>Add email addresses of users who should have access to this Admin Panel.</p>
             <div className='flex gap-4'>
                <Input
                  placeholder="admin@example.com"
                  value={newAdminEmail}
                  onChange={(e)=>setNewAdminEmail(e.target.value)}
                />
                <Button onClick={handleAddAdmin} className="bg-red-600">Grant Access</Button>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className='h-5 w-5' /> API Configurations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-xs font-bold text-gray-400 uppercase'>Gemini API Version</label>
                  <Input value="v1.5-flash" disabled />
                </div>
                <div className='space-y-1'>
                  <label className='text-xs font-bold text-gray-400 uppercase'>Max Tokens per Response</label>
                  <Input value="2048" type="number" />
                </div>
             </div>
             <div className='space-y-1'>
                  <label className='text-xs font-bold text-gray-400 uppercase'>Endpoint URL</label>
                  <Input value="https://generativelanguage.googleapis.com/..." disabled />
             </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <ShieldAlert className='h-5 w-5' /> Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
             <div>
               <h4 className='font-bold text-sm'>Maintenance Mode</h4>
               <p className='text-xs text-gray-500'>Disables user access to interviews while performing updates.</p>
             </div>
             <Button variant="destructive">Enable</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemSettings
