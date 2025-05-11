export interface PostQuestionAnswerResponse {
  id: string;
  question_text: string;
}

export interface QuestionResult {
  category_name: string
  correct_count: number,
  higher_percentage: string,
  percentage: string,
  question_count: number,
  created_date: string
}


export async function fetchQuestionResults(result_id: string): Promise<QuestionResult> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/question_result/${result_id}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data || {}
}

export async function postQuestionAnswer(payload: string): Promise<PostQuestionAnswerResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(
    `${API_URL}/question_result`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload
    }
  )
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

  const data = await res.json();

  return data.data
}
