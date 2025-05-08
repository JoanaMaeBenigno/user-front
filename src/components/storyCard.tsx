"use client"

import { useRouter } from "next/navigation";

type StoryCardProps = {
  title: string;
  subtitle: string;
  image: string;
  route: string;
};

export default function StoryCard({ title, subtitle, image, route }: StoryCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(route); // Navigate to the dynamic route using the slug
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-gray-50"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}