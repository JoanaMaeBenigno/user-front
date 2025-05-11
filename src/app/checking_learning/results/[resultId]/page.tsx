"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchQuestionResults, QuestionResult } from "@/services/questionResultService"

export default function ResultsPage() {
  const [result, setResult] = useState<QuestionResult | null>(null)
  const router = useRouter()
  const { resultId } = useParams()

  useEffect(() => {
    const loadResult =  async () => {
      if (typeof resultId === 'string') {
        const response = await fetchQuestionResults(resultId)

        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Manila',
          hour12: true,
        };
        response.created_date = new Date(response.created_date).toLocaleString('en-US', options);
        setResult(response)
      }
    }
    loadResult()
  }, [])

  if (result == null) return <p>Loading...</p>;

  return (
    <div className="font-serif text-gray-700 max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Answers has been submitted!</h1>
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Congrats!</h2>
        <p className="text-lg text-gray-600 mb-6">
          You got <span className="font-bold text-blue-600">{result.correct_count}</span> out of{" "}
          <span className="font-bold text-blue-600">{result.question_count}</span> correct!
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Your percentage is <span className="font-bold text-blue-600">{result.percentage}%</span>.
        </p>

        <p className="text-lg text-gray-600 mb-6">
          You&apos;re higher than <span className="font-bold text-blue-600">{result.higher_percentage}%</span> of people for <b>{result.category_name}</b> category as of{" "}
          <span className="font-semibold">{result.created_date}</span>.
        </p>

        <button
          onClick={() => router.push(`/checking_learning`)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-lg shadow"
        >

          Back to Categories
        </button>
      </div>
    </div>
  )
}
