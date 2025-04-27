import Image from "next/image"

type CategoryBoxProps = {
  name: string
  icon: string
}

export default function CategoryBox({ name, icon }: CategoryBoxProps) {
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center shadow hover:shadow-lg transition">
      <Image src={icon} alt={name} className="w-12 h-12 mb-4" />
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  )
}
