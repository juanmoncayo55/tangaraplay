import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import WordSearch from './components/wordSearch/WordSearch.jsx'
import HangmanComponent from './components/hangman/Hangman.jsx'
import Crucigrama from "./components/crucigrama/Crucigrama.jsx"

const router = createBrowserRouter([
  {
    path: "/juego/:oidJuego/:oidUsuario",
    element: <App />
  },
  {
    path: "/sopadeletras",
    element: <WordSearch />
  },
  {
    path: "/ahorcado",
    element: <HangmanComponent />
  },
  {
    path: "/crucigrama",
    element: <Crucigrama />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
