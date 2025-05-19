"use client"

import { useEffect, useState } from "react"
import { fetchWorksheets, File } from "@/services/fileService" // adjust the import path as needed
import FileCard from "@/components/fileCard"

export default function WorksheetsPage() {
  const [worksheets, setWorksheets] = useState<File[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWorksheets() // replace with dynamic id if needed
        setWorksheets(data)
      } catch (error) {
        console.error("Failed to fetch worksheets", error)
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
      <h1 className="text-3xl font-bold mb-2 text-center">Worksheet</h1>
      <p className="text-center text-gray-700 mb-8">
        Equip your students to navigate today’s most pressing issues with our downloadable worksheets—designed for educators to spark discussion, deepen understanding, and build informed perspectives on real‑world scientific and social challenges.
      </p>

      <div className="space-y-6">
        {worksheets.map((worksheet) => (
          <FileCard
            key={worksheet.id}
            id={worksheet.id}
            title={worksheet.title}
            description={worksheet.description}
            fileUrl={worksheet.file_url}
            date={transformDate(worksheet.created_date)}
            icon="/worksheet.svg"
            onDownload={handleDownload}
          />
        ))}
      </div>
    </div>
  )
}
