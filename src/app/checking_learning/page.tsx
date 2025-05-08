"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { fetchCategories, Category } from "@/services/categoryService"

export default function CheckingLearning() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories()
      setCategories(data)
    }
    loadCategories()
  }, [])

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (selectedCategory) {
      router.push(`/checking_learning/${selectedCategory.id}`)
    }
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <div className="font-serif text-gray-700 max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Check your Learning</h1>
      <p className="text-center text-gray-700 mb-6">
        Choose a topic below to review and test what you’ve learned.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{cat.description}</p>
              <span className="text-xs text-gray-400">{cat.passRate}% passed</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Ready to take the exam?</h2>
            <p className="text-gray-600 mb-6">
              You selected <span className="font-semibold">{selectedCategory.name}</span>.
            </p>
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
