export type Lesson = {
  id: string
  title: string
  description: string
}

// Dummy Lessons
const dummyLessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Introduction to Biology",
    description: "Learn the basics of living organisms and their life processes.",
  },
  {
    id: "lesson-2",
    title: "Fundamentals of Chemistry",
    description: "Explore atoms, molecules, and chemical reactions.",
  },
  {
    id: "lesson-3",
    title: "Understanding Physics",
    description: "Dive into motion, forces, energy, and the laws of nature.",
  },
  {
    id: "lesson-4",
    title: "World History Overview",
    description: "A journey through ancient civilizations to modern times.",
  },
  {
    id: "lesson-5",
    title: "Mathematics Essentials",
    description: "Sharpen your skills in algebra, geometry, and problem-solving.",
  },
  {
    id: "lesson-6",
    title: "Computer Science Basics",
    description: "Learn about programming, algorithms, and technology foundations.",
  },
]

// Simulate an API fetch
export async function fetchLessons(): Promise<Lesson[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyLessons)
    }, 500) // Simulate network delay
  })
}
