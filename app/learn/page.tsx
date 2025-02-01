"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/Card"
import AITutor from '@/components/AITutor'
import Quiz from '@/components/Quiz'
import FlashCards from '@/components/FlashCards'
import OpenAI from 'openai'

// Define the type for a message
type Message = {
  role: 'user' | 'assistant';
  content: string;
}

export default function LearnPage() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Message[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showFlashCards, setShowFlashCards] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Note: This is not recommended for production
  })

  const handleSendMessage = async () => {
    if (message.trim() === "" || isLoading) return

    const newMessage: Message = { role: "user", content: message }
    const newConversation = [...conversation, newMessage]
    setConversation(newConversation)
    setMessage("")
    setIsLoading(true)

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful AI tutor teaching Python to kids. Keep your explanations simple and engaging." },
          ...newConversation.map(msg => ({ role: msg.role, content: msg.content }))
        ],
      })

      const aiResponse = response.choices[0].message.content
      if (aiResponse) {
        setConversation([...newConversation, { role: "assistant", content: aiResponse }])
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error)
      setConversation([...newConversation, { role: "assistant", content: "Sorry, I'm having trouble responding right now. Please try again later." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
<div className="container mx-auto p-4 bg-purple-50 dark:bg-purple-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-800 dark:text-purple-200">Python Tutor</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg">
          <CardContent>
            <div className="h-96 overflow-y-auto mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded">
              {conversation.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span className={`inline-block p-2 rounded ${msg.role === "user" ? "bg-green-200 dark:bg-green-700" : "bg-blue-200 dark:bg-blue-700"}`}>
                    {msg.content}
                  </span>
                </div>
              ))}
              {isLoading && <div className="text-center text-gray-500 dark:text-gray-400">AI is thinking...</div>}
            </div>
            <div className="flex">
              <Input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow mr-2 bg-white dark:bg-gray-700"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white">Send</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent>
            <AITutor />
            <div className="mt-4 space-y-2">
              <Button onClick={() => setShowQuiz(true)} className="w-full bg-blue-500 hover:bg-blue-600 text-white">Take Quiz</Button>
              <Button onClick={() => setShowFlashCards(true)} className="w-full bg-purple-500 hover:bg-purple-600 text-white">Flash Cards</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      {showFlashCards && <FlashCards onClose={() => setShowFlashCards(false)} />}
    </div>
  )
}