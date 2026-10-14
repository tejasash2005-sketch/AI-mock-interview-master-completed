import React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

function Upgrade() {
  const plans = [
    {
      name: "Free",
      price: "0",
      features: [
        "3 Mock Interviews per month",
        "Basic AI Feedback",
        "Community Support",
        "Access to basic roles"
      ],
      buttonText: "Current Plan",
      active: true
    },
    {
      name: "Pro",
      price: "499",
      period: "/month",
      features: [
        "Unlimited Mock Interviews",
        "Advanced AI Analysis",
        "Priority Support",
        "Resume Analysis Included",
        "All Role Templates"
      ],
      buttonText: "Upgrade to Pro",
      active: false,
      popular: true
    },
    {
      name: "Exclusive",
      price: "999",
      period: "/month",
      features: [
        "Everything in Pro",
        "1-on-1 Mentorship Session",
        "Job Placement Assistance",
        "Exclusive Question Bank",
        "Custom Roadmap"
      ],
      buttonText: "Go Exclusive",
      active: false
    }
  ]

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl mb-2'>Upgrade Your Plan</h2>
      <p className='text-gray-500 mb-10'>Unlock advanced features and prepare for your dream job with more power.</p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((plan, index) => (
          <Card key={index} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-zinc-200'}`}>
            {plan.popular && (
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full'>
                Most Popular
              </div>
            )}
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl font-bold'>{plan.name}</CardTitle>
              <div className='mt-4'>
                <span className='text-4xl font-bold'>₹{plan.price}</span>
                {plan.period && <span className='text-gray-500 text-sm'>{plan.period}</span>}
              </div>
            </CardHeader>
            <CardContent className='flex-grow'>
              <ul className='space-y-4'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-center gap-3 text-gray-600 text-sm'>
                    <Check className='h-4 w-4 text-primary' />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className={`w-full ${plan.active ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : ''}`} disabled={plan.active}>
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Upgrade