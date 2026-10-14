"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HelpCircle, Code, Users, Briefcase, Zap, ChevronDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function Questions() {
  const categories = [
    {
      name: "Behavioral",
      icon: Users,
      description: "Soft skills, teamwork, and problem-solving.",
      questions: [
        {
          q: "Tell me about a time you failed.",
          a: "Focus on a specific professional instance, explain what happened, what you learned, and how you've applied that learning since to avoid similar issues."
        },
        {
          q: "How do you handle conflict in a team?",
          a: "Describe a situation where you remained calm, listened to all perspectives, and worked towards a mutually beneficial resolution."
        },
        {
          q: "What is your greatest strength?",
          a: "Choose a strength relevant to the job, provide an example of how you've used it, and explain how it will benefit the company."
        },
        {
          q: "Tell me about a time you had to work with someone difficult.",
          a: "Explain how you maintained professionalism, communicated clearly, and focused on the common goal despite interpersonal challenges."
        },
        {
          q: "Describe a situation where you had to lead a project.",
          a: "Highlight your organization skills, how you delegated tasks, motivated the team, and successfully achieved the project milestones."
        }
      ]
    },
    {
      name: "Technical",
      icon: Code,
      description: "Role-specific tools, frameworks, and logic.",
      questions: [
        {
          q: "Explain the virtual DOM in React.",
          a: "The virtual DOM is a lightweight copy of the real DOM. React uses it to track changes and efficiently update only the necessary parts of the actual UI."
        },
        {
          q: "What are the differences between SQL and NoSQL?",
          a: "SQL databases are relational and use structured tables, while NoSQL databases are non-relational and can store unstructured data like documents or graphs."
        },
        {
          q: "How do you optimize an API's performance?",
          a: "Use caching, minimize data transfer, optimize database queries, use pagination, and consider asynchronous processing for heavy tasks."
        },
        {
          q: "What is a closure in JavaScript?",
          a: "A closure is a function that has access to its outer function scope even after the outer function has returned."
        },
        {
          q: "How does the 'this' keyword work in JavaScript?",
          a: "'this' refers to the object that is executing the current function. Its value depends on how the function is called (globally, as a method, etc.)."
        },
        {
          q: "What are the advantages of using TypeScript over JavaScript?",
          a: "TypeScript provides static typing, which helps catch errors early, improves code readability, and provides better IDE support with autocompletion."
        }
      ]
    },
    {
      name: "Situational",
      icon: Zap,
      description: "How you react to specific work scenarios.",
      questions: [
        {
          q: "What would you do if a deadline is impossible to meet?",
          a: "Communicate early with stakeholders, explain the situation with data, and propose alternatives like descoping or extending the deadline."
        },
        {
          q: "How do you prioritize multiple urgent tasks?",
          a: "Assess the impact and urgency of each task (using tools like Eisenhower Matrix), focus on the most critical ones first, and communicate status updates."
        },
        {
          q: "If a client is unhappy, what is your first step?",
          a: "Listen actively to their concerns without being defensive, acknowledge their feelings, and work together to find a solution."
        },
        {
          q: "How would you handle a situation where you disagree with your manager's decision?",
          a: "Discuss it privately, provide evidence-based reasons for your perspective, but ultimately support the final decision made by the team."
        },
        {
          q: "What would you do if you realized you made a major mistake in your code after it went to production?",
          a: "Immediately alert the team, help with the fix or rollback, and then lead a post-mortem to prevent it from happening again."
        },
        {
          q: "How do you stay updated with the latest industry trends and technologies?",
          a: "Read blogs (like TechCrunch, Dev.to), follow industry leaders on social media, attend webinars, and work on side projects with new tools."
        }
      ]
    },
    {
      name: "Career Goals",
      icon: Briefcase,
      description: "Your long-term vision and fit.",
      questions: [
        {
          q: "Where do you see yourself in 5 years?",
          a: "Express a desire for growth within the company, mention specific skills you want to master or leadership roles you're aiming for."
        },
        {
          q: "Why do you want to work at this company?",
          a: "Research the company's mission, values, and recent successes, and explain how they align with your own career goals and values."
        },
        {
          q: "What motivates you to do your best work?",
          a: "Mention things like solving complex problems, making a positive impact, continuous learning, or collaborating with a talented team."
        },
        {
          q: "What are you looking for in your next role?",
          a: "Focus on opportunities for growth, a positive company culture, a role where you can utilize your strengths, and a clear path for advancement."
        },
        {
          q: "How do you handle work-related stress or pressure?",
          a: "Explain your healthy coping mechanisms like prioritization, taking short breaks, staying organized, and maintaining a work-life balance."
        }
      ]
    }
  ]

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl mb-2 text-primary'>Question Bank</h2>
      <p className='text-gray-500 mb-8'>Explore common interview questions and AI-recommended answers.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {categories.map((cat, index) => (
          <Card key={index} className="border-none bg-zinc-50/50 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className='p-3 rounded-lg bg-primary/10'>
                <cat.icon className='h-6 w-6 text-primary' />
              </div>
              <div>
                <CardTitle className="text-xl">{cat.name}</CardTitle>
                <p className='text-xs text-gray-400'>{cat.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {cat.questions.map((item, i) => (
                  <Collapsible key={i}>
                    <CollapsibleTrigger className='w-full text-left'>
                      <div className='flex items-center justify-between gap-3 text-sm text-gray-700 bg-white p-4 rounded-lg border border-zinc-100 hover:border-primary/30 transition-all group'>
                        <div className='flex gap-3'>
                          <HelpCircle className='h-4 w-4 text-primary mt-0.5 shrink-0' />
                          <span className='font-medium'>{item.q}</span>
                        </div>
                        <ChevronDown className='h-4 w-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform' />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className='mt-2 p-4 bg-primary/5 rounded-lg border border-primary/10 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2'>
                        <strong className='text-primary block mb-1'>AI Recommended Answer:</strong>
                        {item.a}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Questions