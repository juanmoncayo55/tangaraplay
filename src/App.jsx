import Header from "./components/Header"
import Footer from "./components/Footer"

export default function App() {

  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">
        <header className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl">Juegos</h1>
          </div>
        </header>
        <section className="grow container mx-auto flex flex-col md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
          
        </section>
      </main>
      <Footer />
    </div>
  )
}