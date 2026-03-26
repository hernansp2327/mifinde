import { createContext, useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
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

    return () => unsubscribe();
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
  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "eventos", id));
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  // ✅ APROBAR evento
  const approveEvent = async (id) => {
    try {
      await updateDoc(doc(db, "eventos", id), {
        estado: "aprobado"
      });
    } catch (error) {
      console.error("Error al aprobar evento:", error);
    }
  };

  // ❌ RECHAZAR evento
  const rejectEvent = async (id) => {
    try {
      await updateDoc(doc(db, "eventos", id), {
        estado: "rechazado"
      });
    } catch (error) {
      console.error("Error al rechazar evento:", error);
    }
  };

  // ⭐ DESTACAR evento
  const toggleFeatured = async (id) => {
    try {
      const evento = eventos.find(e => e.id === id);

      await updateDoc(doc(db, "eventos", id), {
        destacado: !evento?.destacado
      });
    } catch (error) {
      console.error("Error al destacar evento:", error);
    }
  };

  return (
    <EventosContext.Provider
      value={{
        eventos,
        agregarEvento,
        deleteEvent,
        approveEvent,
        rejectEvent,
        toggleFeatured
      }}
    >
      {children}
    </EventosContext.Provider>
  );
}