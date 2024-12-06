import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Juegos from './Juegos.jsx'
import WordSearch from './components/wordSearch/WordSearch.jsx'
import HangmanComponent from './components/hangman/Hangman.jsx'
import Crucigrama from "./components/crucigrama/Crucigrama.jsx"
import Trivia from './components/trivia/Trivia.jsx'
import ListaJuegos from './ListaJuegos.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/juegos/:tipoJuego/:oidJuego/:oidUsuario",
    element: <Juegos />
  },
  {
    path: "/lista/trivia/:oid",
    element: <ListaJuegos />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
