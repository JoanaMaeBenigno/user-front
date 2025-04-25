"use client"

import { useEffect, useState } from "react"
import StoryCard from "@/components/storyCard"
import LessonCard from "@/components/lessonCard"
import { fetchArticles, Article } from "@/services/articleService"
import { Lesson, fetchLessons } from "@/services/lessonServices"
import { usePathname } from "next/navigation"

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const loadData = async () => {
      const articlesData = await fetchArticles(1, 6)  // Fetch only 6 articles
      const lessonsData = await fetchLessons()
      setArticles(articlesData)
      setLessons(lessonsData)
    }

    loadData()
  }, [pathname])

  return (
    <div className="font-serif text-gray-900">
      <section className="text-white text-center">
        <div className="relative h-[70vh] w-full mb-8">
          <img src="/article_hero.jpg" alt="EduQuest Banner" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl font-bold mb-6">Welcome to EduQuest!</h1>
              <p className="text-xl mb-8">
                Your journey to knowledge and success starts here. Explore lessons, stories, and quizzes tailored just for you.
              </p>
              <a href="#featured" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Featured Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((story) => (
            <StoryCard
              route="article/test"
              key={story.uuid}
              title={story.title}
              subtitle={story.subtitle}
              image={story.thumbnail_image}
            />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Check the Latest Added Lessons</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
            />
          ))}
        </div>
      </section>

      <section className="text-center py-16 bg-blue-50">
        <h2 className="text-4xl font-bold mb-4">Ready to Take Exam?</h2>
        <p className="mb-8 text-gray-600">Test your knowledge and challenge yourself today!</p>
        <button className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700">
          Go take a Quiz!
        </button>
      </section>
    </div>
  )
}
