"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

// Define the types for the questions and answers
type Question = {
  id: string
  question: string
  choices: string[]
  correctAnswer: string
}

type Answers = {
  [key: string]: string // Maps question ID to selected answer
}

type Category = {
  name: string | string[] | undefined
}

const questions: Question[] = [
  {
    id: "q1",
    question: "What is the capital of France?",
    choices: ["Paris", "Berlin", "Rome", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: "q2",
    question: "Which is the largest planet?",
    choices: ["Earth", "Venus", "Jupiter", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    id: "q3",
    question: "What gas do plants absorb?",
    choices: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    correctAnswer: "Carbon Dioxide",
  },
]

const categoryDescription = "This category tests your general knowledge on a variety of topics."

export default function CategoryPage() {
  const { id } = useParams() // Get the category id from the URL params
  const [answers, setAnswers] = useState<Answers>({}) // Store the selected answers
  const [showModal, setShowModal] = useState<boolean>(false) // Track if the modal is open
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined | null>(null) // Selected category details
  const router = useRouter()

  // Handle the selection of a choice for a specific question
  const handleChange = (questionId: string, selected: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selected }))
  }

  // Triggered when the user clicks the submit button
  const handleSubmit = () => {
    setSelectedCategory({ name: id }) // Set the selected category based on the URL
    setShowModal(true) // Show the confirmation modal
  }

  // Handle confirmation after submitting the quiz
  const handleConfirm = () => {
    console.log("Submitted Answers:", answers) // Log the answers (for now)
    setShowModal(false) // Close the modal
    alert("Answers submitted! (Check console log)") // Show a confirmation alert
    // After confirmation, navigate to the results page
    router.push(`/checking_learning/results/${id}`)
  }

  // Handle cancellation of submission
  const handleCancel = () => {
    setShowModal(false) // Close the modal without submitting
  }

  return (
    <div className="font-serif text-gray-700 max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Category: {id}</h1>
      <p className="text-center mb-8 text-gray-600">{categoryDescription}</p>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="border p-6 rounded-xl shadow bg-white">
              <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.choices.map((choice) => (
                  <label key={choice} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={q.id}
                      value={choice}
                      checked={answers[q.id] === choice}
                      onChange={() => handleChange(q.id, choice)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
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
