"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
// import { fetchQuestions, Question } from "@/services/questionService"
import { fetchSurveyQuestions, SurveyQuestion } from "@/services/surveyQuestionService"
import { Category, fetchCategory } from "@/services/categoryService"

type Answers = {
  [key: string]: number // Maps question ID to selected answer
}

export default function CategoryPage() {
  const { categoryId } = useParams() // Get the category id from the URL params
  const [answers, setAnswers] = useState<Answers>({}) // Store the selected answers
  const [questions, setQuestions] = useState<SurveyQuestion[]>([])
  const [showModal, setShowModal] = useState<boolean>(false) // Track if the modal is open
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined | null>(null) // Selected category details
  // const router = useRouter()

  useEffect(() => {
    const loadQuestions = async () => {
      if (typeof categoryId === 'string') {
        const surveyQuestionData = await fetchSurveyQuestions(categoryId)
        setQuestions(surveyQuestionData)
        const categoryData = await fetchCategory(categoryId)
        setSelectedCategory(categoryData)
      }
    }
    loadQuestions()
  }, [])

  // Handle the selection of a choice for a specific question
  const handleChange = (questionId: string, selected: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selected }))
  }

  // Triggered when the user clicks the submit button
  const handleSubmit = () => {
    setShowModal(true) // Show the confirmation modal
  }

  // Handle confirmation after submitting the quiz
  const handleConfirm = () => {
    console.log("Submitted Answers:", answers) // Log the answers (for now)
    setShowModal(false) // Close the modal
    alert("Answers submitted! (Check console log)") // Show a confirmation alert
    // After confirmation, navigate to the results page
    // router.push(`/checking_learning/results/${categoryId}`)
  }

  // Handle cancellation of submission
  const handleCancel = () => {
    setShowModal(false) // Close the modal without submitting
  }

  return (
    <div className="font-serif text-gray-700 max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">{selectedCategory?.name}</h1>
      <p className="text-center mb-8 text-gray-600">{selectedCategory?.description}</p>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id}>
              <h2 className="text-xl font-semibold mb-2">Question #{index + 1}</h2>
              <div className="mb-2">{question.question_text}</div>
              <div className="ml-4">
                {Array.from({ length: 4 }).map((_, choiceIndex) => {
                  const choiceId = choiceIndex + 1; // Choice 1, 2, 3, 4
                  return (
                    <label key={choiceId} className="flex items-center space-x-2 mb-1">
                      <input
                        type="radio"
                        name={question.id}
                        value={choiceId}
                        checked={answers[question.id] === choiceId}
                        onChange={() => handleChange(question.id, choiceId)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{choiceId}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow"
          >
            Submit Answers
          </button>
        </div>
      </form>

      {/* Modal for confirmation */}
      {showModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Submit your quiz?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
