import React, { useEffect, useState } from "react";
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

      console.log(juegos)
      setListGame(juegos);
    })()
  }, [params]);

  return(
    <>
      <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
        <main className="grow w-full flex flex-col">
          <Header />

          <section className="grow container mx-auto flex flex-col md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
            <div className="grid grid-cols-5 gap-4 my-6">
              {
                listGame.length > 0 ?
                  listGame.map((item, key) => (
                    <Link key={key} className="bg-stone-300 px-2 py-3 text-center font-semibold flex items-center justify-center" to={`/juegos/${item.tipoJuego}/${item.oidJuego}/18`}>
                      {item.titulo}
                    </Link>
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