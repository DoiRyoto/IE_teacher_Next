import firebaseApp from "./client"
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const login = () => {
  signInWithPopup(auth, new GoogleAuthProvider())
}

export const logout = () => {
  auth.signOut()
}

export default auth
