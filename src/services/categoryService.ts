export type Category = {
  id: string
  name: string
  description: string
  passRate: number // percentage of students who passed
}

export async function fetchCategories(): Promise<Category[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/check_learning/category`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data || []
}

export async function fetchCategory(category_id: string): Promise<Category> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/check_learning/category/${category_id}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data || {}
}
