"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Users,
  Search,
  Mail,
  MoreVertical,
  UserPlus,
  ShieldCheck,
  Ban
} from 'lucide-react'

function UserManagement() {
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    // Get unique users from interviews
    const result = await db.select().from(MockInterview)
    const uniqueMap = {}
    result.forEach(item => {
      if(!uniqueMap[item.createdBy]) {
        uniqueMap[item.createdBy] = {
          email: item.createdBy,
          interviewsCount: 1,
          lastActive: item.createdAt
        }
      } else {
        uniqueMap[item.createdBy].interviewsCount++
      }
    })
    setUserList(Object.values(uniqueMap))
    setLoading(false)
  }

  return (
    <div>
      <div className='flex justify-between items-end mb-8'>
        <div>
          <h1 className='text-3xl font-bold'>User Management</h1>
          <p className='text-gray-500'>Monitor user activity and manage permissions.</p>
        </div>
        <Button className="bg-red-600">
          <UserPlus className='h-4 w-4 mr-2' /> Add Admin
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className='p-4 border-b flex gap-4'>
             <div className='relative flex-1'>
               <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
               <Input placeholder="Filter by name or email..." className="pl-10" />
             </div>
             <Button variant="outline">Export CSV</Button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead className='bg-gray-50 text-gray-600 text-sm uppercase'>
                <tr>
                  <th className='px-6 py-4 font-semibold'>User</th>
                  <th className='px-6 py-4 font-semibold'>Role</th>
                  <th className='px-6 py-4 font-semibold'>Sessions</th>
                  <th className='px-6 py-4 font-semibold'>Last Active</th>
                  <th className='px-6 py-4 font-semibold'>Status</th>
                  <th className='px-6 py-4 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {userList.map((user, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold'>
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className='font-medium'>{user.email.split('@')[0]}</p>
                          <p className='text-xs text-gray-400 flex items-center gap-1'><Mail className='h-3 w-3'/> {user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                       <span className='text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full'>User</span>
                    </td>
                    <td className='px-6 py-4 font-medium'>{user.interviewsCount}</td>
                    <td className='px-6 py-4 text-sm text-gray-500'>{user.lastActive}</td>
                    <td className='px-6 py-4'>
                       <span className='flex items-center gap-1 text-green-600 text-xs font-bold'>
                         <ShieldCheck className='h-3 w-3' /> Active
                       </span>
                    </td>
                    <td className='px-6 py-4'>
                       <Button variant="ghost" size="sm"><MoreVertical className='h-4 w-4' /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagement
