import { useEffect, useState } from "react";
import { fetchDataListaJuegos } from "./utils/data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link, useParams } from "react-router-dom";

const ListaJuegos = () => {
  let params = useParams();

  const [listGame, setListGame] = useState([]);

  useEffect(() => {
    const {oid} = params;
    (async() => {
      const todosJuegos = await fetchDataListaJuegos();
      const juegos = todosJuegos.filter(juego => juego.tipoJuego === parseInt(oid));
      const getSomeElements = juegos.map(element => {
        return {
          oidJuego: element.oidJuego,
          tipoJuego: element.tipoJuego
        }
      });
      let ArregloOrdenado = getSomeElements.sort((a, b) => a.oidJuego - b.oidJuego);

      localStorage.setItem("listIdPresentGame", JSON.stringify(ArregloOrdenado));

      setListGame(juegos);
    })()
  }, [params]);

  return(
    <>
      <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
        <main className="grow w-full flex flex-col">
          <Header />

          <section className="grow container mx-auto flex flex-col md:flex-row space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
            <div className="grid grid-cols-5 gap-4 my-6 items-start">
              {
                listGame.length > 0 ?
                  listGame.map((item, key) => (
                    <div className="card w-auto text-azul-claro shadow-lg transition-all ease-in-out duration-700 cursor-pointer  hover:shadow-2xl px-3 py-1" key={key}>
                        <div className="card-body  pt-6 p-2">
                          <h2 className="card-title mx-auto text-center leading-tight text-base">{item.titulo}</h2>
                          <Link  className="btn bg-transparent hover:bg-success text-center font-semibold flex items-center justify-center" to={`/juegos/${item.tipoJuego}/${item.oidJuego}/18`}>
                            Jugar
                          </Link>
                          </div>
                      </div>
                  ))
                  : null
              }
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  )
}

export default ListaJuegos