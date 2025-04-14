type StoryCardProps = {
  title: string;
  subtitle: string;
  image: string;
};

export default function StoryCard({ title, subtitle, image }: StoryCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}