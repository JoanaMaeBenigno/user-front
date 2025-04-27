export default function Article() {
  type BlogArticleProps = {
    title: string;
    subtitle?: string;
    author: string;
    date: string;
    content: Array<{
      type: "paragraph";
      text?: string;
      image?: string;
      caption?: string;
    }>;
  };

  const articleData: BlogArticleProps = {
    title: "Penguins in Peril: The Fight to Protect Punta Tombo",
    subtitle: "How a protected colony in Argentina faced an unexpected massacre",
    author: "Jane Doe",
    date: "April 14, 2025",
    content: [
      {
        type: "paragraph",
        text: "In the sprawling Patagonian coastal reserve of Punta Tombo, home to the world’s largest colony of Magellanic penguins, conservationists faced a crisis last year..."
      },
      {
        type: "paragraph",
        text: "Punta Tombo is known for its rich biodiversity and decades-long conservation efforts..."
      },
      {
        type: "paragraph",
        text: "“We’ve seen encroachments and weak accountability,” says Maria Ruiz..."
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto text-gray-800 font-serif">
      <div className="relative w-full mb-8 px-6 pt-6">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
          {articleData.title}
        </h1>
      </div>

      {/* Subtitle and Meta */}
      <div className="px-6 mb-10">
        {articleData.subtitle && (
          <p className="text-xl italic text-gray-600 mb-2">{articleData.subtitle}</p>
        )}
        <div className="text-sm text-gray-500">
          By <span className="font-semibold">{articleData.author}</span> · {articleData.date}
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg prose-gray px-6 pb-16">
        {articleData.content.map((item, index) => {
          if (item.type === "paragraph") {
            return <p className="text-lg mb-4" key={index}>{item.text}</p>;
          }
          if (item)
          return null;
        })}
      </div>
    </div>
  )
}
