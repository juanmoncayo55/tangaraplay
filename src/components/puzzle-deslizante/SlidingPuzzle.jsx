import { useContext, useState } from "react";
import Tile from "./Tile";
import { canSwap, shuffle, swap, isSolved } from "./helpers"
import { GameContext } from "../../App";
import "./slidingpuzzle.css"

function SlidingPuzzle({grid = 3}) {
  const { data, attempts, moves, handleMoves } = useContext(GameContext);

  const tileCount = grid** 2;
  const [ boardWidth, setBoardWidth] = useState(window.innerWidth <=768 ? 350 : window.innerHeight * .85 - 100);
  const [ boardHeight, setBoardHeight] = useState(window.innerWidth <=768 ? 350 : window.innerHeight * .85 - 100);
  const [tiles, setTiles] = useState([...Array(tileCount).keys()]);    
  const [isStarted, setIsStarted] = useState(false);


  const shuffleTiles = () => {
      const shuffledTiles = shuffle(tiles,tileCount);
      setTiles(shuffledTiles);
      handleMoves(data.errores);
      setUsedHelps(0);
  }

  const swapTiles = (tileIndex) => {
      if (!hasWon && (moves > 0) && canSwap(tileIndex, tiles.indexOf(tiles.length - 1), grid)) {
        const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
        setTiles(swappedTiles)
        handleMoves(moves - 1);
      }
  }
  
  const handleTileClick = (index) => swapTiles(index); 

  const handleShuffleClick = () => shuffleTiles();  

  const handleStartClick = () => {
      shuffleTiles();
      setIsStarted(true);
  }

  const totalHelps = 2;
  let [usedHelps, setUsedHelps] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  let [helpCounter, setHelpCounter] = useState(5);
  const handleShowHelp = () => {
      setShowHelp(!showHelp);
      let helpinterval = setInterval(() => setHelpCounter(--helpCounter), 1000);
      setTimeout(() => {
          setShowHelp(false);
          setHelpCounter(5);
          clearInterval(helpinterval);
          setUsedHelps(++usedHelps);
      }, 5000);
  }

  const hasWon = isSolved(tiles);

  return (
      <>
          <div className="board-grid" style={{width:boardWidth + 'px', height:boardHeight + 'px'}}>
              {tiles.map((tile, index) => (
                  <Tile
                      key={tile}
                      index={index}
                      tile={tile}
                      tileCount={tileCount}
                      width={boardWidth / grid}
                      height={boardHeight / grid}
                      gridSize={grid}
                      imgTile={data.url}
                      handleTileClick={handleTileClick}
                      showHelp={showHelp}
                  />
              ))}
          </div>
          <div className="board-footer mt-4" style={{ width: `${boardWidth}px`}}>
              {moves > 0 && !hasWon &&
                  <div className="step-counter w-auto stat place-items-center p-2">
                      <div className="stat-title">Total Movimientos:</div>
                      <div className="stat-value text-secondary">{moves}</div>
                      <div className="stat-desc text-secondary">Límite de movimientos: {data.errores}</div>
                  </div>
              }
              {isStarted && (moves > 0) && !hasWon &&
              <div className="form-control">
                  <label className={`label cursor-pointer ${showHelp && 'pointer-events-none'}`}>
                  <span className="label-text me-3">{ `${!showHelp ? (usedHelps===totalHelps ? 'No hay más ayuda':'Mostrar ayuda') : 'Sin ayuda en ' + helpCounter}`}</span>
                  <input type="checkbox" className="toggle toggle-accent" onChange={() => handleShowHelp()} checked={showHelp} disabled={usedHelps===totalHelps ? true:false} />
                  </label>
              </div>
              }
              
              {!isStarted &&  <button className="btn btn-accent text-neutral uppercase font-bold" onClick={() => handleStartClick()}>Iniciar Juego</button>}
              {isStarted && (moves > 0) && !hasWon && <button className="btn btn-warning uppercase font-bold" onClick={() => handleShuffleClick()}>Reiniciar</button>}
              
              {moves === 0 && !hasWon &&
                  <div role="alert" className="alert alert-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>¡Has alcanzado el número máximo de movimientos permitidos!</span>
                      <button className="btn btn-info text-white font-bold uppercase" onClick={() => handleShuffleClick()}>Comenzar de nuevo</button>
                  </div>
              }
              {hasWon && isStarted &&
               <div role="alert" className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white font-bold">¡Felicitaciones, lo resolviste en {data.errores - moves} movimientos!</span>
                  <button className="btn btn-warning text-neutral font-bold uppercase" onClick={() => handleShuffleClick()}>Comenzar de nuevo</button>
              </div>
              }
          </div>
      </>
  )
}

export default SlidingPuzzle