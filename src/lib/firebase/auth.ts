import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import firebaseApp from './client'

const auth = getAuth(firebaseApp)

export const login = () => {
  signInWithPopup(auth, new GoogleAuthProvider())
}

export const logout = () => {
  auth.signOut()
}

export default auth
