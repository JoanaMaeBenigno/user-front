export interface PostSurveyResponse {
  id: string
}

export interface SurveyResult {
  average: string
  category_name: string,
  created_date: string
}

export async function fetchSurveyResults(result_id: string): Promise<SurveyResult> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${API_URL}/survey_result/${result_id}`)
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json()

  return json.data || {}
}

export async function postSurveyAnswer(payload: string): Promise<PostSurveyResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(
    `${API_URL}/survey_result`,
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
