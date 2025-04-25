"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)
  const [date, setDate] = useState<string>("")
  const router = useRouter()

  // Dummy data for the correct answers (you can replace this logic with your own)
  const totalQuestions = 5
  const correctAnswersCount = 4  // Example: assume the user got 4 correct answers

  useEffect(() => {
    // Calculate the percentage
    const calculatedPercentage = (correctAnswersCount / totalQuestions) * 100
    setCorrectAnswers(correctAnswersCount)
    setPercentage(calculatedPercentage)

    // Get today's date
    const today = new Date().toLocaleDateString()
    setDate(today)
  }, [])

  return (
    <div className="font-serif text-gray-700 max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Results</h1>
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Congrats!</h2>
        <p className="text-lg text-gray-600 mb-6">
          You got <span className="font-bold text-blue-600">{correctAnswers}</span> out of{" "}
          <span className="font-bold text-blue-600">{totalQuestions}</span> correct!
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Your percentage is <span className="font-bold text-blue-600">{percentage}%</span>.
        </p>

        <p className="text-lg text-gray-600 mb-6">
          You're higher than <span className="font-bold text-blue-600">85%</span> of people for this category as of{" "}
          <span className="font-semibold">{date}</span>.
        </p>

        <button
          onClick={() => router.push("/checking_learning")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg shadow"
        >
          Back to Categories
        </button>
      </div>
    </div>
  )
}