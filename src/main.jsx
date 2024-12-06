import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Juegos from './Juegos.jsx'
import ListaJuegos from './ListaJuegos.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/juegos/:oid",
    element: <ListaJuegos />
  },
  {
    path: "/juegos/:tipoJuego/:oidJuego/:oidUsuario",
    element: <Juegos />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
