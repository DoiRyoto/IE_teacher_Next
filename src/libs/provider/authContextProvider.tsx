"use client";

import React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "../firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

interface AuthContextProps {
  user: User | null;
  userDoc: UserDoc | null;
}

export interface paper {
  paperId: string | null;
  title: string | null;
  year: string | null;
  citationCount: string | null;
  tldr: string | null;
}

export interface UserDoc {
  name: string;
  likes: paper[];
}

async function fetchUserDoc(uid: string) {
  const db = await getFirestore();
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  const data = userDoc.data() as UserDoc;

  return data;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  userDoc: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [userDoc, setUserDoc] = React.useState<UserDoc | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserDoc(user.uid).then((data) => {
          setUserDoc(data);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userDoc }}>
      {children}
    </AuthContext.Provider>
  );
};
