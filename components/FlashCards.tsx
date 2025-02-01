import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"

const flashCards = [
  { front: "What is a variable?", back: "A container for storing data values" },
  { front: "What is a function?", back: "A block of code that performs a specific task" },
  // Add more flash cards here
]

interface FlashCardsProps {
  onClose: () => void;
}

export default function FlashCards({ onClose }: FlashCardsProps) {
  const [currentCard, setCurrentCard] = useState(0)
  const [showBack, setShowBack] = useState(false)

  const handleNextCard = () => {
    setCurrentCard((currentCard + 1) % flashCards.length)
    setShowBack(false)
  }

  return (
    <Card className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <CardContent className="bg-white p-8 rounded-lg max-w-2xl w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Python Flash Cards</h2>
        <Card className="h-64 flex items-center justify-center cursor-pointer" onClick={() => setShowBack(!showBack)}>
          <CardContent>
            <p className="text-xl">{showBack ? flashCards[currentCard].back : flashCards[currentCard].front}</p>
          </CardContent>
        </Card>
        <div className="mt-4 space-x-2">
          <Button onClick={handleNextCard}>Next Card</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </CardContent>
    </Card>
  )
}