import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect } from 'react'

const BASE_URL = 'https://epic-backend-fslq.vercel.app/api'

export const userAtom = atomWithStorage('user', {
  "_id": "",
  "name": "",
  "email": "",
  "password": "",
  "role": "",
  "createdAt": "",
  "updatedAt": "",
  "__v": 0,
  "wishlist": [],
  "purchasedGames": []
})

export const tokenAtom = atomWithStorage<string | null>('token', null)

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(tokenAtom)

  // Fetch user data on mount if token exists but user data is empty
  useEffect(() => {
    if (token && !user._id) {
      getUser()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('token', data.token)
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message || 'Signup failed' }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const getUser = async () => {
    const storedToken = token || localStorage.getItem('token')

    if (!storedToken) {
      return { success: false, message: 'No token found' }
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/get-user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok && data.user) {
        setUser(data.user[0]) // API returns array, get first user
        return { success: true, user: data.user[0] }
      } else {
        // Clear invalid token
        setToken(null)
        setUser({
          "_id": "",
          "name": "",
          "email": "",
          "password": "",
          "role": "",
          "createdAt": "",
          "updatedAt": "",
          "__v": 0,
          "wishlist": [],
          "purchasedGames": []
        })
        localStorage.removeItem('token')
        return { success: false, message: 'Failed to fetch user' }
      }
    } catch (error) {
      console.error('Get user error:', error)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const logout = () => {
    setToken(null)
    setUser({
      "_id": "",
      "name": "",
      "email": "",
      "password": "",
      "role": "",
      "createdAt": "",
      "updatedAt": "",
      "__v": 0,
      "wishlist": [],
      "purchasedGames": []
    })
    localStorage.removeItem('token')
  }

  const isAuthenticated = user.role === 'user' || user.role === 'admin'

  return {
    user,
    login,
    signup,
    logout,
    getUser,
    isAuthenticated,
    token
  }
}

export const useIsAdmin = () => {
  const userValue = useAtomValue(userAtom)
  if (userValue.email !== '') {
    if (userValue.role === 'admin') {
      return true
    }
    return false
  }
  return false
}

// setUser({ id: payload.id, email: payload.email, role: payload.role });
