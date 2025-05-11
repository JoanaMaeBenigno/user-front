"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchSurveyResults, SurveyResult } from "@/services/surveyResultService"

export default function ResultsPage() {
  const [result, setResult] = useState<SurveyResult | null>(null)
  const router = useRouter()
  const { resultId } = useParams()

  useEffect(() => {
    const loadResult =  async () => {
      if (typeof resultId === 'string') {
        const response = await fetchSurveyResults(resultId)
        setResult(response)
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
