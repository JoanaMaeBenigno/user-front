"use client"

import { useEffect, useState } from "react"
import { fetchLessons, fetchVideos, File } from "@/services/fileService" // adjust the import path as needed
import FileCard from "@/components/fileCard"
import YouTubeEmbed from "@/components/youtubeEmbed"

export default function LessonsPage() {
  const [lessons, setLessons] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const lessonResponse = await fetchLessons() // replace with dynamic id if needed
        setLessons(lessonResponse)

        const videoResponse = await fetchVideos() // replace with dynamic id if needed
        setVideos(videoResponse)
      } catch (error) {
        console.error("Failed to fetch lessons", error)
      }
    }
    load()
  }, [])

  function getYouTubeVideoId(url: string): string {
    const urlObj = new URL(url);
    const youtubeId: string | null = urlObj.searchParams.get("v");
    if (youtubeId == null) {
      return ''
    }
    return youtubeId
  }

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
        Browse our curated library of lessons—each one carefully crafted to guide you step by step through key concepts.
      </p>

      <div className="space-y-6 mb-10">
        {lessons.map((lesson) => (
          <FileCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            description={lesson.description}
            fileUrl={lesson.file_url}
            icon="/lesson.svg"
            date={transformDate(lesson.created_date)}
            onDownload={handleDownload}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">Videos</h2>
      <div className="space-y-6">
        {videos.map((video) => (
          <YouTubeEmbed key={video.id} youtubeId={getYouTubeVideoId(video.file_url)} />
        ))}
      </div>
    </div>
  )
}
