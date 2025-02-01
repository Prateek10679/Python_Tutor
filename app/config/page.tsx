"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default function ConfigPage() {
  const [apiKey, setApiKey] = useState("")

  const handleSaveApiKey = () => {
    // In a real application, you would securely store this API key
    // For this example, we'll just log it to the console
    console.log("API Key saved:", apiKey)
    // You might want to use localStorage or a more secure method in a real app
    localStorage.setItem("aiApiKey", apiKey)
    alert("API Key saved successfully!")
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
              AI API Key
            </label>
            <Input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your AI API key"
              className="mt-1"
            />
          </div>
          <Button onClick={handleSaveApiKey}>Save API Key</Button>
        </CardContent>
      </Card>
    </div>
  )
}

