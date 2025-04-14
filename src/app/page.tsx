import HeroBanner from "@/components/heroBanner"
import StoryCard from "@/components/storyCard"

export default function home() {
  const featuredStories = [
    {
      title: "Penguins in Peril",
      subtitle: "Massacre in a protected reserve raises alarm",
      image: "/images/penguin-thumb.jpg",
    },
    {
      title: "Vanishing Glaciers",
      subtitle: "What melting ice means for the planet",
      image: "/images/glacier-thumb.jpg",
    },
    {
      title: "Amazon at Risk",
      subtitle: "How illegal logging devastates ecosystems",
      image: "/images/amazon-thumb.jpg",
    },
  ]

  return (
    <div className="font-serif text-gray-900">
      <HeroBanner
        title="Explore the Wild. Protect the Future."
        image="/images/hero-banner.jpg"
        description="Your window into the natural world — science, wildlife, exploration."
      />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Featured Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredStories.map((story, idx) => (
            <StoryCard key={idx} {...story} />
          ))}
        </div>
      </section>
    </div>
  )
}
