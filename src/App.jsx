import { useEffect, useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MenuJuegos from "./components/MenuJuegos"
import { fetchDataListaJuegos } from "./utils/data"
import { Link } from "react-router-dom"

const idMenuJuegos = [
  {"oid": 1, "nombre": "Ahorcado con Imagen"},
  {"oid": 2, "nombre": "Ahorcado con Pregunta"},
  {"oid": 3, "nombre": "Rompecabezas"},
  {"oid": 4, "nombre": "Adivinanza Pregunta"},
  {"oid": 5, "nombre": "Adivinanza Imagen"},
  {"oid": 6, "nombre": "Ruleta-Pregunta-Unica"},
  {"oid": 7, "nombre": "Ruleta-Imagen-Unica"},
  {"oid": 8, "nombre": "Ruleta-Pregunta-multiple"},
  {"oid": 9, "nombre": "Ruleta-Imagen-multiple"},
  {"oid": 10, "nombre": "Adivinanza-(Trivia Pregunta)-multiple"},
  {"oid": 11, "nombre": "Adivinanza-(Trivia Imagen)-multiple"},
  {"oid": 12, "nombre": "Busca las parejas"},
  {"oid": 13, "nombre": "Sopa de letras"},
  {"oid": 14, "nombre": "Tres en raya"},
  {"oid": 15, "nombre": "sudoku"},
  {"oid": 16, "nombre": "Crucigrama"},
];

export default function App() {
  const [availableItems, setAvailableItems] = useState([]);
  useEffect(() => {
    (async() => {
      const todosJuegos = await fetchDataListaJuegos();
      var uniqs = todosJuegos.reduce(function (acc, item) {
        acc[item.tipoJuego] = (acc[item.tipoJuego] || 0) + 1;
        return acc;
      }, {});

      var allIds = Object.keys(uniqs).map(Number);

      // Filtrar los id disponibles
      const filtrarIds = idMenuJuegos.filter((game) => allIds.includes(game.oid));

      // Resultado
      const result = filtrarIds.map(({ oid, nombre }) => ({ oid, nombre }));

      console.log(result)
      setAvailableItems(result);
    })()
  }, []);
  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">
        <header className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl">Juegos</h1>
          </div>
        </header>
        <section className="grow container mx-auto flex justify-center items-center px-4 lg:px-16 xxl:px-0 pb-12">
          {/*<MenuJuegos display="cards" />*/}
          <div className="flex flex-wrap gap-3">
            {
              availableItems.length > 0
                ? availableItems.map((item, key) => (
                  <Link key={key} className="bg-gray-100 w-auto shadow-lg transition-all ease-in-out duration-700 text-black hover:shadow-2xl py-5 px-4" to={`/lista/trivia/${item.oid}`}>{item.nombre}</Link>
                ))
                : null
            }
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}