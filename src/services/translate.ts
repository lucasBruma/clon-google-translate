import { type FromLanguage, type Language } from '../types.d'

export async function translate (
  {
    fromLanguage,
    toLanguage,
    text
  }: {
    fromLanguage: FromLanguage
    toLanguage: Language
    text: string
  }
) {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      fromLanguage,
      toLanguage,
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch('https://api-traductor.onrender.com', options)
    const data = await response.json()
    return data.message
  } catch (e: any) {
    console.log(e)
  }
}
