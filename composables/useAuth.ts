import { useNuxtApp } from '#app'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

const useAuth = () => {
  const { $firebaseAuth } = useNuxtApp()
  const user = useState<User | null>(() => null)

  onAuthStateChanged($firebaseAuth, (firebaseUser) => {
    user.value = firebaseUser ? firebaseUser : null
    isSignedIn.value = !!firebaseUser
  })

  const isSignedIn = useState<boolean>(() => !!user.value)

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

  const checkAuthState = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged($firebaseAuth, (user) => {
        unsubscribe()
        resolve(!!user)
      })
    })
  }

  return {
    user,
    isSignedIn,
    login,
    register,
    logout,
    checkAuthState,
  }
}

export default useAuth
