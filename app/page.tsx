import Link from 'next/link'
import { Button } from "@/components/ui/Button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-200 dark:from-purple-900 dark:to-blue-900">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 dark:text-purple-200">Python Language Tutor for Kids</h1>
        
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Welcome to Your Python Adventure!</h2>
          
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Our AI-powered Python Language Tutor is designed to help children learn basic Python coding in a fun and interactive way. With personalized lessons, engaging exercises, and a friendly AI tutor, you'll be coding like a pro in no time!
          </p>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Features include customizable AI tutor characters, interactive quizzes, flashcards, and hands-on coding exercises. Whether you're a complete beginner or have some coding experience, our tutor adapts to your skill level to provide the best learning experience.
          </p>
          
          <div className="flex justify-center">
            <Link href="/learn">
              <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}