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

import { Collapse } from 'flowbite';

function App() {

  const styles = {
    linkMenu: "text-white text-lg hover:text-slate-400"
  }



// set the target element that will be collapsed or expanded (eg. navbar menu)
const $targetEl = document.getElementById('targetEl');

// optionally set a trigger element (eg. a button, hamburger icon)
const $triggerEl = document.getElementById('triggerEl');

// optional options with default values and callback functions
const options = {
    onCollapse: () => {
        console.log('element has been collapsed');
    },
    onExpand: () => {
        console.log('element has been expanded');
    },
    onToggle: () => {
        console.log('element has been toggled');
    },
};

// instance options object
const instanceOptions = {
  id: 'targetEl',
  override: true
};

/*
 * $targetEl: required
 * $triggerEl: optional
 * options: optional
 * instanceOptions: optional
 */
const collapse = new Collapse(
    $targetEl,
    $triggerEl,
    options,
    instanceOptions
);

  return (
    <>
      <div className="overflow-x-hidden bg-backgroundAzulOscuro min-h-full h-screen">      

<nav className="bg-backgroundAzulOscuro w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">

  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse justify-end px-5 pt-4">
    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" ariaControls="navbar-sticky" ariaExpanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>

  <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pb-4">
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-backgroundAzulOscuro space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
      <Link to="/" className={styles.linkMenu}>Ruleta</Link>
      <Link to="/trivia" className={styles.linkMenu}>Trivia</Link>
      <Link to="/trivia-multiple" className={styles.linkMenu}>TriviaMultiple</Link>
      <Link to="/hangman" className={styles.linkMenu}>Hangman</Link>
      <Link to="/crucigrama" className={styles.linkMenu}>Crucigrama</Link>
      <Link to="/wordSearch" className={styles.linkMenu}>WordSearch</Link>
      <Link to="/puzzle-deslizante" className={styles.linkMenu}>Sliding Puzzle</Link>
      <Link to="/memorama-cartas" className={styles.linkMenu}>Memorama Cartas</Link>
      <Link to="/tres-en-linea" className={styles.linkMenu}>Tres en línea</Link>
    </ul>
  </div>
  </div>
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

/*
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
*/
export default App