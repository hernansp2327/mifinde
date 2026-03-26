import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 CLAVE

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {

      if (userFirebase) {
        setUser(userFirebase);

        const ref = doc(db, "usuarios", userFirebase.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setRol(snap.data().rol);
        }

      } else {
        setUser(null);
        setRol(null);
      }

      setLoading(false); // 🔥 IMPORTANTE
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, rol, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}