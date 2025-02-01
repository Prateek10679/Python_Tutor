import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

const tutors = [
  { id: 'python', name: 'Py the Python' },
  { id: 'robot', name: 'Robby the Robot' },
  { id: 'wizard', name: 'Merlin the Code Wizard' },
]

type Tutor = typeof tutors[number];

export default function AITutor() {
  const [selectedTutor, setSelectedTutor] = useState<Tutor>(tutors[0])

  const handleTutorChange = (value: string) => {
    const newTutor = tutors.find(t => t.id === value);
    if (newTutor) {
      setSelectedTutor(newTutor);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your AI Tutor</h2>
      <div className="flex items-center mb-4">
        {/* <img src={`/tutors/${selectedTutor.id}.png`} alt={selectedTutor.name} className="w-16 h-16 rounded-full mr-4" /> */}
        <div>
          <p className="font-semibold">{selectedTutor.name}</p>
          <Select onValueChange={handleTutorChange} defaultValue={selectedTutor.id}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a tutor" />
            </SelectTrigger>
            <SelectContent>
              {tutors.map((tutor) => (
                <SelectItem key={tutor.id} value={tutor.id}>{tutor.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}