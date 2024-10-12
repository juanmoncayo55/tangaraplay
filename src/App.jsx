import {Routes, Route} from "react-router-dom";
import Roulette from "./components/roulette/Roulette";
import Trivia from "./components/trivia/Trivia.jsx";
import Hangman from "./components/hangman/Hangman.jsx";
import Area from "./components/area/Area.jsx";
import Puzzle from "./components/puzzle/Puzzle.jsx";

function App() {

  return (
    <>
      <div className="overflow-x-hidden bg-backgroundAzulOscuro min-h-full h-screen">
        <Routes>
          <Route path="/" element={<Roulette />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/area" element={<Area />} />
          <Route path="/puzzle" element={<Puzzle numeroColumnas={3} urlImagen={'https://placedog.net/800/800?r'} />} />
        </Routes>
      </div>
    </>
  )
}

export default App