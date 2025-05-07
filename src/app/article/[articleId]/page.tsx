"use client"

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BlogArticleProps, fetchArticle } from "@/services/articleService";

export default function Article() {
  const router = useRouter()

  const { articleId } = useParams<{ articleId: string }>();

  const [articleData, setArticleData] = useState<BlogArticleProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId || typeof articleId !== "string") return;

    fetchArticle(articleId)
      .then((data) => {
        const newData: BlogArticleProps = {
          title: data.title,
          subtitle: data.subtitle,
          posted_date: data.posted_date,
          content: JSON.parse(data.content),
          author: data.author
        }
        console.log(newData.content)
        setArticleData(newData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load article.");
        setIsLoading(false);
      });
  }, [articleId]);

  if (isLoading) return <p className="px-6 py-10">Loading...</p>;
  if (error) return <p className="px-6 py-10 text-red-500">{error}</p>;
  if (!articleData) return <p className="px-6 py-10">No article found.</p>;

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
          By <span className="font-semibold">{articleData.author}</span> · {articleData.posted_date}
        </div>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg prose-gray px-6">
        {articleData.content.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <p className="text-lg mb-4" key={index}>
                {item.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            );
          }
          return null;
        })}
      </div>

      <div className="px-6 py-4">
        <button
          onClick={() => router.push('/article')}
          className="text-blue-500 hover:text-blue-700 font-medium underline bg-transparent border-none cursor-pointer"
        >
          Back to the Article Collection
        </button>
      </div>
    </div>
  )
}
