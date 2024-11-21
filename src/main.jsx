import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Roulette from './components/roulette/Roulette.jsx'
import Trivia from './components/trivia/Trivia.jsx'
import TriviaMultiple from './components/triviaMultiple/TriviaMultiple.jsx'
import Hangman from './components/hangman/index.js'
import SlidingPuzzle from './components/puzzle-deslizante/SlidingPuzzle.jsx'
import MemoramaCartas from './components/memorama-cartas/MemoramaCartas.jsx'
import Crucigrama from './components/crucigrama/Crucigrama.jsx'
import WordSearch from './components/wordSearch/WordSearch.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/ruleta",
    element: <Roulette />
  },
  {
    path: "/trivia",
    element: <Trivia />
  },
  {
    path: "/trivia-multiple",
    element: <TriviaMultiple />
  },
  {
    path: "/ahorcado",
    element: <Hangman />
  },
  {
    path: "/rompecabezas",
    element: <SlidingPuzzle />
  },
  {
    path: "/memoria",
    element: <MemoramaCartas />
  },
  {
    path: "/crucigrama",
    element: <Crucigrama />
  },
  {
    path: "/sopa-de-letras",
    element: <WordSearch />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
