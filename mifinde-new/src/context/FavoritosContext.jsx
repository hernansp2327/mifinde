import { createContext, useState, useEffect } from "react";

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {

  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("favoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id) => {

    const idNumero = Number(id);

    setFavoritos(prev => {

      if (prev.includes(idNumero)) {
        return prev.filter(f => f !== idNumero);
      }

      return [...prev, idNumero];
    });

  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}