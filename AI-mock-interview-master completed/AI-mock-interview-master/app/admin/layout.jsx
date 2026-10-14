"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { db } from '@/utils/db'
import { AdminUsers } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  MessageSquareDiff,
  Lightbulb,
  Bot,
  Settings,
  ShieldAlert,
  LoaderCircle,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

function AdminLayout({ children }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const path = usePathname()
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    if (isLoaded && user) {
      checkAdminStatus()
    } else if (isLoaded && !user) {
      router.replace('/dashboard')
    }
  }, [user, isLoaded])

  const checkAdminStatus = async () => {
    try {
      // Check if any admin exists at all
      const allAdmins = await db.select().from(AdminUsers)

      // If no admins exist in the DB, the first person to access this page becomes the Super Admin
      if (allAdmins.length === 0) {
        await db.insert(AdminUsers).values({
          email: user?.primaryEmailAddress?.emailAddress,
          name: user?.fullName || 'Super Admin',
          role: 'super_admin',
          createdAt: new Date().toLocaleDateString()
        })
        setIsAdmin(true)
        return
      }

      const result = await db.select().from(AdminUsers)
        .where(eq(AdminUsers.email, user?.primaryEmailAddress?.emailAddress))

      if (result.length > 0) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error("Database Error:", error)
      setIsAdmin('error')
    }
  }

  if (isAdmin === 'error') {
    return (
      <div className='flex flex-col items-center justify-center h-screen p-5 text-center'>
        <div className='p-8 max-w-md bg-white border rounded-xl shadow-lg'>
          <ShieldAlert className='h-16 w-16 text-orange-500 mx-auto mb-4' />
          <h1 className='text-xl font-bold mb-2'>Database Setup Required</h1>
          <p className='text-gray-500 mb-6'>
            The Admin tables have not been created in your database yet.
          </p>
          <div className='bg-gray-900 text-white p-4 rounded-lg text-left text-xs font-mono mb-6 overflow-x-auto'>
            npx drizzle-kit push
          </div>
          <p className='text-xs text-gray-400'>
            Run the command above in your terminal, then refresh this page.
          </p>
          <button
            className="mt-6 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => window.location.reload()}
          >
            I've run the command, Refresh now
          </button>
        </div>
      </div>
    )
  }

  if (isAdmin === null) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <LoaderCircle className='animate-spin h-10 w-10 text-primary' />
      </div>
    )
  }

  if (isAdmin === false) {
    return (
      <div className='flex flex-col items-center justify-center h-screen p-5 text-center'>
        <ShieldAlert className='h-20 w-20 text-red-500 mb-4' />
        <h1 className='text-2xl font-bold'>Access Denied</h1>
        <p className='text-gray-500'>You do not have administrative privileges to access this area.</p>
        <Link href='/dashboard' className='mt-4 text-blue-600 underline'>Return to Dashboard</Link>
      </div>
    )
  }

  const menuList = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Interview Monitor', icon: ClipboardCheck, path: '/admin/interviews' },
    { name: 'Feedback Corrections', icon: MessageSquareDiff, path: '/admin/feedback' },
    { name: 'AI Suggestions', icon: Lightbulb, path: '/admin/suggestions' },
    { name: 'AI Assistant Config', icon: Bot, path: '/admin/ai-assistant' },
    { name: 'AI Playground', icon: Sparkles, path: '/admin/ai-assistant/chat' },
    { name: 'System Settings', icon: Settings, path: '/admin/settings' },
  ]

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='w-64 bg-white border-r hidden md:block shadow-sm'>
        <div className='p-6 border-b'>
          <h2 className='text-xl font-bold text-primary flex items-center gap-2'>
             <ShieldAlert className='h-5 w-5' /> Admin Panel
          </h2>
        </div>
        <div className='p-4'>
          {menuList.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <div className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all ${path === menu.path && 'bg-red-50 text-red-600'}`}>
                <menu.icon className='h-5 w-5' />
                <span className='font-medium'>{menu.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        <header className='h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm'>
          <h2 className='text-lg font-semibold text-gray-700'>Admin Workspace</h2>
          <div className='text-sm text-gray-500'>Logged in as: {user?.fullName}</div>
        </header>
        <main className='p-8 overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
