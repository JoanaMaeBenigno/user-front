type HeroBannerProps = {
  title: string;
  image: string;
  description: string;
};

export default function HeroBanner({ title, image, description }: HeroBannerProps) {
  return (
    <div className="relative h-[70vh] w-full mb-8">
      <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0" />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}