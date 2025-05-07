export type Article = {
  title: string
  subtitle: string
  thumbnail_image: string
  uuid: string
}

export type Content = {
  type: string
  content: string
}

export type ArticleFetch = {
  title: string
  subtitle: string
  posted_date: string
  content: string
  author: string
}

export type BlogArticleProps = {
  title: string
  subtitle: string
  posted_date: string
  content: Content[]
  author: string
}

export async function fetchArticles(page = 1, pageSize = 20): Promise<Article[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/article?page=${page}&page_size=${pageSize}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data?.posts || []
}

export async function fetchArticle(articleId: string): Promise<ArticleFetch> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/article/${articleId}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data || {}
}
