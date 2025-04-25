export type Category = {
  id: string
  name: string
  description: string
  passRate: number // percentage of students who passed
}

// Dummy Categories
const dummyCategories: Category[] = [
  {
    id: "cat-1",
    name: "Biology",
    description: "Study of living organisms and ecosystems.",
    passRate: 78,
  },
  {
    id: "cat-2",
    name: "Chemistry",
    description: "Understanding matter and chemical reactions.",
    passRate: 82,
  },
  {
    id: "cat-3",
    name: "Physics",
    description: "Explore forces, energy, and the universe.",
    passRate: 75,
  },
  {
    id: "cat-4",
    name: "History",
    description: "Events and people that shaped our world.",
    passRate: 88,
  },
  {
    id: "cat-5",
    name: "Mathematics",
    description: "Numbers, equations, and problem-solving skills.",
    passRate: 70,
  },
]

// Simulate API call
export async function fetchCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyCategories)
    }, 500)
  })
}
