const TOKEN_KEY = "parkify_token"

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {}
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {}
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getToken()
  const headers = new Headers(init.headers || {})
  if (token) headers.set("Authorization", `Bearer ${token}`)
  // Set JSON content-type if sending a body and not already set
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }
  const res = await fetch(input, { ...init, headers })
  if (!res.ok) {
    let message = res.statusText
    try {
      const data = await res.json()
      message = data?.error || message
    } catch {
      // ignore parse error, keep statusText
    }
    const err: any = new Error(message || "Request failed")
    err.status = res.status
    throw err
  }
  return res
}
