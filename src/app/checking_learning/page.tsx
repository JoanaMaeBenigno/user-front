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
      <h1 className="text-4xl font-bold mb-8 text-center">Check Your Learning</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="border p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all bg-white hover:bg-blue-50"
          >
            <h2 className="text-2xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-gray-600 mb-4">{cat.description}</p>
            <div className="text-sm text-blue-600 font-medium">
              {cat.passRate}% of students passed
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
