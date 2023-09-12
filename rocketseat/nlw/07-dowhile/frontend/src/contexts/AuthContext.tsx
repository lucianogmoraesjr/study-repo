import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string
  avatar_url: string
  name: string
  login: string
}

interface AuthResponse {
  token: string
  user: User
}

interface AuthContextData {
  user: User | null
  signInUrl: string
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }`

  async function signIn(githubCode: string) {
    const { data } = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = data

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(user)
  }

  async function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      api.get<User>('profile').then((response) => setUser(response.data))
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('signin/callback?code=')

      window.history.pushState({}, '', urlWithoutCode)

      signIn(githubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
