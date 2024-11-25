import Header from "./components/Header"
import Footer from "./components/Footer"
import Corazon from "./components/Corazon"
import { createContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { fetchData } from "./utils/data"

import SlidingPuzzle from "./components/puzzle-deslizante/SlidingPuzzle"

export const GameContext = createContext();

export default function App() {

  const { oidJuego, oidUsuario } = useParams();
  const [ attempts, setAttempts ] = useState(0);
  const [ moves, setMoves ] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleMoves(totalMoves) {
    setMoves(totalMoves);
    if(moves === 0)setAttempts(attempts - 1);
  }  

  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataObj = await fetchData(oidJuego, oidUsuario);
      setTimeout(() => {
        console.log(dataObj);
        if(dataObj.error){
          setError(dataObj.error);
          setLoading(false);
        }else{
          setData(dataObj);
          setMoves(dataObj.errores);
          setAttempts(dataObj.intentos);
          setLoading(false);
        }
      }, 2000);
    })();
  }, [oidJuego, oidUsuario]);
  

  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">
        <header className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl">{data.pregunta}</h1>
          </div>
        </header>
        <section className="grow container mx-auto flex flex-col min-h-screen md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
          {/* info */}
          <aside className="w-full md:w-1/2 h-full 2xl:h-2/3 flex flex-col space-y-6 md:space-y-14 justify-between items-center">
            <div className="flex bg-primary text-white rounded-b-3xl w-4/5 md:w-2/3 h-1/3 max-h-max p-2 pt-8 divide-x-2">
              <div className="w-1/2 flex flex-col justify-end items-center">
                <div className="vidas flex space-x-2 mb-4">
                  {Array.from({ length: attempts}).map((vida,index) => <Corazon key={index}/>)}
                </div>
                <div className="text-sm">Vidas</div>
              </div>
              <div className="w-1/2 flex flex-col justify-end items-center">
                <div className="movimientos text-4xl mb-2">{moves}</div>
                <div className="text-sm">Movimientos</div>
              </div>
            </div>
            <div className={`bg-gris-claro-azul rounded-3xl w-full h-2/3 max-h-max xl:max-h-full p-6 md:p-12 justify-center flex flex-col items-center ${loading && 'skeleton'}`}>
              <div className="pregunta space-y-2">
                
              </div>
            </div>
          </aside>
          {/* juego */}
          <div className="w-full md:w-1/2 h-full 2xl:h-2/3 flex justify-center items-center pt-12">
            <div className={`aspect-square h-full max-h-96 xl:max-h-full ${loading && 'skeleton'}`}>
              <GameContext.Provider value={{data, attempts, moves, handleMoves}}>
                {Object.entries(data).length > 0 ?
                <SlidingPuzzle data={data} />
                :
                <h2>{error}</h2>
                }
              </GameContext.Provider>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}