export type SurveyQuestion = {
  id: string
  question_text: string
}

export async function fetchSurveyQuestions(category_id: string): Promise<SurveyQuestion[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/check_learning/survey/${category_id}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data || []
}
