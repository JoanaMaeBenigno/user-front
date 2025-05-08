type LessonCardProps = {
  title: string
  description: string
}

export default function LessonCard({ title, description }: LessonCardProps) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
