export type Choice = {
  id: string
  answer_text: string
}

export type Question = {
  id: string
  question_text: string
  choices: Choice[]
}

export async function fetchQuestions(category_id: string): Promise<Question[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/check_learning/question/${category_id}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()
  console.log(json)

  return json.data || []
}
