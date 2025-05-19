"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchSurveyResults, SurveyResult } from "@/services/surveyResultService"

type Message = {
  description: string
  text: string
  className: string
}

export default function ResultsPage() {
  const [result, setResult] = useState<SurveyResult | null>(null)
  const [message, setMessage] = useState<Message>({
    description: '',
    text: '',
    className: ''
  })
  const router = useRouter()
  const { resultId } = useParams()

  const getMessage = (average: number): Message => {
    if (average >= 3.50) {
      return {
        description: "Fully Aware",
        text: "You're on 🔥! You see it all before it even happens!",
        className: 'text-green-700'
      }
    }
    if (average >= 2.50) {
      return {
        description: "Aware",
        text: "Nice radar! Nothing sneaks past you!",
        className: 'text-blue-700'
      }
    }
    if (average >= 1.50) {
      return {
        description: "Unaware",
        text: "Heads up! There's more going on than you realize!",
        className: 'text-yellow-700'
      }
    }

    return {
      description: "Very Unaware",
      text: "Whoops! Time to tune in and wake up!",
      className: 'text-red-700'
    }
  }

  useEffect(() => {
    const loadResult =  async () => {
      if (typeof resultId === 'string') {
        const response = await fetchSurveyResults(resultId)
        setResult(response)
        setMessage(getMessage(Number(response.average)))
      }
    }
    loadResult()
  }, [])

  if (result == null) return <p>Loading...</p>;

  return (
    <div className="font-serif text-gray-700 max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Thank you for answering the survey!</h1>
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <p className="text-lg text-gray-600 mb-6">
          Your awareness for <b>{result.category_name}</b> category is <b>{result.average}</b>!
        </p>

        <p className={`text-lg mb-4 font-semibold ${message.className}`}>
          <b>{message.description}</b> — {message.text}
        </p>

        <button
          onClick={() => router.push(`/quick_check`)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg shadow"
        >

          Back to Categories
        </button>
      </div>
    </div>
  )
}
