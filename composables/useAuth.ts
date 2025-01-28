import { useNuxtApp } from '#app'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

export function useAuth() {
  const { $firebaseAuth } = useNuxtApp()
  const user = ref()

  onAuthStateChanged($firebaseAuth, (firebaseUser) => {
    user.value = firebaseUser ? firebaseUser : null
  })

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $firebaseAuth,
        email,
        password
      )
      return userCredential.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $firebaseAuth,
        email,
        password
      )
      return userCredential.user
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut($firebaseAuth)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    login,
    register,
    logout,
  }
}
