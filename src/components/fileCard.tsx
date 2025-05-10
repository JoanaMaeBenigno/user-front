import React from "react"

type Props = {
  id: string
  title: string
  description: string
  fileUrl: string
  date: string
  icon: string
  onDownload: (url: string) => void
}

export default function FileCard({
  id,
  title,
  description,
  fileUrl,
  date,
  icon,
  onDownload
}: Props) {
  return (
    <div
      key={id}
      className="flex w-full max-w-xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
        <img src={icon} alt="Lesson Logo" className="w-16 h-16 object-contain" />
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-xs text-gray-400 mt-2">{date}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onDownload(fileUrl)}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  )
}