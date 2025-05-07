"use client"

import { useEffect, useRef, useReducer } from "react"
import StoryCard from "@/components/storyCard"
import { fetchArticles, Article } from "@/services/articleService"
import { usePathname } from "next/navigation"

// Types for reducer state and actions
type State = {
  articles: Article[]
  page: number
  loading: boolean
  hasMore: boolean
}

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Article[] }
  | { type: "INCREMENT_PAGE" }
  | { type: "RESET" }

// Initial reducer state
const initialState: State = {
  articles: [],
  page: 1,
  loading: false,
  hasMore: true,
}

// Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true }
    case "LOAD_SUCCESS":
      const newUniqueArticles = action.payload.filter(
        (newArticle) => !state.articles.some((existing) => existing.uuid === newArticle.uuid)
      )
      return {
        ...state,
        articles: [...state.articles, ...newUniqueArticles],
        loading: false,
        hasMore: newUniqueArticles.length > 0,
      }
    case "INCREMENT_PAGE":
      return { ...state, page: state.page + 1 }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export default function Articles() {
  const [state, dispatch] = useReducer(reducer, initialState)
    const { articles, page, loading, hasMore } = state
    const loaderRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    const loadMoreArticles = async (pageNum: number) => {
      dispatch({ type: "LOAD_START" })
      const newArticles = await fetchArticles(pageNum, 20)
      dispatch({ type: "LOAD_SUCCESS", payload: newArticles })
    }

    useEffect(() => {
      loadMoreArticles(page)
    }, [page])

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          dispatch({ type: "INCREMENT_PAGE" })
        }
      })

      const currentLoader = loaderRef.current
      if (currentLoader) observer.observe(currentLoader)

      return () => {
        if (currentLoader) observer.unobserve(currentLoader)
      }
    }, [loading, hasMore])

    useEffect(() => {
      dispatch({ type: "RESET" })
      console.log("RESET")
    }, [pathname])

    useEffect(() => {
      console.log("Fetched Articles:", articles)
    }, [articles])

    return (
      <div className="font-serif text-gray-900">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Latest Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((story) => (
              <StoryCard
                route={`article/${story.uuid}`}
                key={story.uuid}
                title={story.title}
                subtitle={story.subtitle}
                image={story.thumbnail_image}
              />
            ))}
          </div>

          <div ref={loaderRef} className="h-16 flex items-center justify-center">
            {loading && <p>Loading more...</p>}
            {!hasMore && <p>No more stories to load.</p>}
          </div>
        </section>
      </div>
    )
}
