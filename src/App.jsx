import Header from "./components/Header"
import Footer from "./components/Footer"
import Corazon from "./components/Corazon"

function App({vidas = 3, movimientos}) {

  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">
        <div className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl">Rompecabezas</h1>
          </div>
        </div>
        <div className="grow container mx-auto flex flex-col md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
          {/* info */}
          <div className="w-full md:w-1/2 h-80 md:h-full xl:h-2/3 flex flex-col space-y-6 md:space-y-14 justify-between items-center">
            <div className="flex bg-primary text-white rounded-b-3xl w-4/5 md:w-2/3 h-1/3 max-h-max p-2 pt-8 divide-x-2">
              <div className="w-1/2 flex flex-col justify-end items-center">
                <div className="vidas flex space-x-2 mb-4">
                  {Array.from({ length: vidas}).map((vida,index) => <Corazon key={index}/>)}
                </div>
                <div className="text-sm">Vidas</div>
              </div>
              <div className="w-1/2 flex flex-col justify-end items-center">
                <div className="movimientos text-4xl mb-2">20</div>
                <div className="text-sm">Movimientos</div>
              </div>
            </div>
            <div className="bg-gris-claro-azul rounded-3xl w-full h-2/3 max-h-max xl:max-h-full p-6 md:p-12 justify-center flex flex-col items-center">
              <div className="pregunta space-y-2">
                <p className="text-2xl"><span className="skeleton block w-36 min-h-8"></span></p>
                <p className="text-xl"><span className="skeleton block min-w-60 min-h-4"></span></p>
                <p className="text-xl"><span className="skeleton block min-w-60 min-h-4"></span></p>
              </div>
            </div>
          </div>
          {/* juego */}
          <div className="w-full md:w-1/2 h-96 md:h-full xl:h-2/3 flex justify-center items-center pt-12">
            <div className="aspect-square h-full max-h-96 md:max-h-full">
              <div className="skeleton size-full"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App