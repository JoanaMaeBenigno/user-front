type LessonCardProps = {
  title: string
  description: string
}

export default function LessonCard({ title, description }: LessonCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
