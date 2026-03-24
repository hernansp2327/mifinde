import { createContext, useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";

export const EventosContext = createContext();

export function EventosProvider({ children }) {

  const [eventos, setEventos] = useState([]);

  // 🔄 TIEMPO REAL desde Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "eventos"), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEventos(lista);
    });

    return () => unsubscribe(); // limpiar listener
  }, []);

  // ➕ AGREGAR evento
  const agregarEvento = async (nuevoEvento) => {
    try {
      await addDoc(collection(db, "eventos"), nuevoEvento);
    } catch (error) {
      console.error("Error al agregar evento:", error);
    }
  };

  // ❌ ELIMINAR evento
  const eliminarEvento = async (id) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  return (
    <EventosContext.Provider value={{ eventos, agregarEvento, eliminarEvento }}>
      {children}
    </EventosContext.Provider>
  );
}