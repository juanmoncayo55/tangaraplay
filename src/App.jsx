import {Routes, Route, Link} from "react-router-dom";

//Componentes
import Roulette from "./components/roulette/Roulette";
import Trivia from "./components/trivia/Trivia.jsx";
import Hangman from "./components/hangman/Hangman.jsx";
import Area from "./components/area/Area.jsx";
import TriviaMultiple from "./components/triviaMultiple/TriviaMultiple.jsx";
import Crucigrama from "./components/crucigrama/Crucigrama.jsx";
import WordSearch from "./components/wordSearch/WordSearch.jsx";
import SlidingPuzzle from "./components/puzzle-deslizante/SlidingPuzzle.jsx";
import {imgs} from './components/memorama-cartas/data.js';
import MemoramaCartas from "./components/memorama-cartas/MemoramaCartas.jsx";
import Board from "./components/tres-en-linea/Board.jsx";

function App() {

  const styles = {
    linkMenu: "text-white text-lg hover:text-slate-400"
  }
  return (
    <>
      <div className="overflow-x-hidden bg-backgroundAzulOscuro min-h-full h-screen">
        <nav className="flex justify-center space-x-5 items-center z-10 relative py-2">
          <Link to="/" className={styles.linkMenu}>Ruleta</Link>
          <Link to="/trivia" className={styles.linkMenu}>Trivia</Link>
          <Link to="/trivia-multiple" className={styles.linkMenu}>TriviaMultiple</Link>
          <Link to="/hangman" className={styles.linkMenu}>Hangman</Link>
          <Link to="/crucigrama" className={styles.linkMenu}>Crucigrama</Link>
          <Link to="/wordSearch" className={styles.linkMenu}>WordSearch</Link>
          <Link to="/puzzle-deslizante" className={styles.linkMenu}>Sliding Puzzle</Link>
          <Link to="/memorama-cartas" className={styles.linkMenu}>Memorama Cartas</Link>
          <Link to="/tres-en-linea" className={styles.linkMenu}>Tres en línea</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Roulette />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/trivia-multiple" element={<TriviaMultiple />} />
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/area" element={<Area />} />
          <Route path="/puzzle-deslizante" element={<SlidingPuzzle numeroColumnas={3} maxMovimientos={100} urlImagen={'https://placedog.net/800/800?id=14'} />} />
          <Route path="/memorama-cartas" element={<MemoramaCartas listaImagenes={imgs} />} />
          <Route path="/tres-en-linea" element={<Board />} />
          <Route path="/crucigrama" element={<Crucigrama />} />
          <Route path="/wordSearch" element={<WordSearch />} />
        </Routes>
      </div>
    </>
  )
}

export default App