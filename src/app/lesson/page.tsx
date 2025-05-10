"use client"

import { useEffect, useState } from "react"
import { fetchLessons, File } from "@/services/fileService" // adjust the import path as needed
import FileCard from "@/components/fileCard"

export default function LessonsPage() {
  const [lessons, setLessons] = useState<File[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLessons() // replace with dynamic id if needed
        setLessons(data)
      } catch (error) {
        console.error("Failed to fetch lessons", error)
      }
    }
    load()
  }, [])

  const transformDate = (stringDate: string): string => {
    const date = new Date(stringDate)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Manila',
    }

    return new Intl.DateTimeFormat("en-US", options).format(date)
  }

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "_blank")
  }

  return (
    <div className="font-serif text-gray-700 max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center">Lessons</h1>
      <p className="text-center text-gray-700 mb-8">
        download this lesson
      </p>

      <div className="space-y-6">
        {lessons.map((lesson) => (
          <FileCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            description={lesson.description}
            fileUrl={lesson.file_url}
            date={transformDate(lesson.created_date)}
            onDownload={handleDownload}
          />
        ))}
      </div>
    </div>
  )
}
