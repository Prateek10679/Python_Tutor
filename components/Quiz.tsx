import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const quizQuestions = [
  {
    question: "What is the correct way to print 'Hello, World!' in Python?",
    options: [
      "console.log('Hello, World!')",
      "print('Hello, World!')",
      "echo 'Hello, World!'",
      "System.out.println('Hello, World!')"
    ],
    correctAnswer: 1
  },
  // Add more questions here
]

interface QuizProps {
  onClose: () => void;
}

export default function Quiz({ onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  return (
    <Card className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <CardContent className="bg-white p-8 rounded-lg max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">Python Quiz</CardTitle>
        </CardHeader>
        {showScore ? (
          <div>
            <h2 className="text-xl mb-4">You scored {score} out of {quizQuestions.length}</h2>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">{quizQuestions[currentQuestion].question}</h2>
            <div className="space-y-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button key={index} onClick={() => handleAnswerClick(index)} className="w-full text-left">
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}