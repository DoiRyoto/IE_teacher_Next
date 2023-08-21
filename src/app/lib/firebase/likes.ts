import { db } from "@/lib/firebase/store";
import { paperData } from "@/app/utils/type";
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export async function updateLike (uid: string | null, paper: paperData) {
    if(!uid){
        return null
    }

    await updateDoc(doc(db, "users", uid), {likes: arrayUnion({...paper, isLike: true})}).catch(
        (FirebaseError) => (setDoc(doc(db, "users", uid), {likes: [{...paper, isLike: true}]}))
    )
}

export async function getLikes (uid: string) {
    if(!uid){
        return [] as paperData[]
    }

    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data().likes as paperData[]
    } else {
        return [] as paperData[]
    }
}

export async function deleteLike (uid: string | null, paper: paperData) {
    if(!uid){
        return null
    }

    await updateDoc(doc(db, "users", uid), {likes: arrayRemove(paper)})
}