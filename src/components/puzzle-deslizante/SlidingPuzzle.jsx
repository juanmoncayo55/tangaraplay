import { useContext, useEffect, useState } from "react";
import Tile from "./Tile";
import { canSwap, shuffle, swap, isSolved } from "./helpers"
import { GameContext } from "../../Juegos";
import "./slidingpuzzle.css"

function SlidingPuzzle({grid = 3}) {
  const { data, moves, handleMoves, boardSize } = useContext(GameContext);

  const tileCount = grid** 2;
  const [ boardWidth, setBoardWidth] = useState(boardSize.width);
  const [ boardHeight, setBoardHeight] = useState(boardSize.height);
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

  useEffect(() => {
    setBoardWidth(boardSize.width);
    setBoardHeight(boardSize.height);
  }, [boardSize]);

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
                      imgTile={data.url.replaceAll(' ','%20')}
                      handleTileClick={handleTileClick}
                      showHelp={showHelp}
                  />
              ))}
          </div>
          <div className="absolute bottom-0 right-0 board-footer w-full">
              {isStarted && (moves > 0) && !hasWon &&
              <div className="form-control absolute bottom-0 left-0 translate-y-full">
                  <label className={`label cursor-pointer ${showHelp && 'pointer-events-none'}`}>
                    <span className="label-text me-3">{ `${!showHelp ? (usedHelps===totalHelps ? 'No hay más ayuda':'Mostrar ayuda') : 'Sin ayuda en ' + helpCounter}`}</span>
                    <input type="checkbox" className="toggle toggle-accent" onChange={() => handleShowHelp()} checked={showHelp} disabled={usedHelps===totalHelps ? true:false} />
                  </label>
              </div>
              }
              
              {!isStarted &&  <button className="btn btn-accent btn-circle absolute bottom-0 right-0 w-20 h-20 text-primary uppercase font-bold" onClick={() => handleStartClick()}>Jugar</button>}
              
              {moves === 0 && !hasWon &&
                <div role="alert" className="alert alert-warning">
                    <span>¡Has alcanzado el número máximo de movimientos permitidos!</span>
                    <button className="btn btn-info text-white font-bold uppercase" onClick={() => handleShuffleClick()}>Comenzar de nuevo</button>
                </div>
              }             
          </div>
      </>
  )
}

export default SlidingPuzzle