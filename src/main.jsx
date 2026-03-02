import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { EventosProvider } from "./context/EventosContext"
import { FavoritosProvider } from "./context/FavoritosContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EventosProvider>
      <FavoritosProvider>
        <App />
      </FavoritosProvider>
    </EventosProvider>
  </React.StrictMode>
)