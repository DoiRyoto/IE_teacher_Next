"use client";

import React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "../firebase/auth";

export interface AuthContextProps {
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
