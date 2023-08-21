import firebaseApp from "./client"
import { getFirestore } from "firebase/firestore"

export const db = getFirestore(firebaseApp)