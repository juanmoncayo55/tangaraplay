import { useState } from "react";
import Tile from "./Tile";
import { canSwap, shuffle, swap, isSolved } from "./helpers"
import "./slidepuzzle.css";

function Board({ grid, imgUrl }) {
    
    let [ steps, setSteps] = useState(0);
    const tileCount = grid** 2;
    const [ boardWidth, setBoardWidth] = useState(window.innerWidth <=768 ? 350 : window.innerHeight * .85 - 100);
    const [ boardHeight, setBoardHeight] = useState(window.innerWidth <=768 ? 350 : window.innerHeight * .85 - 100);
    
    const [tiles, setTiles] = useState([...Array(tileCount).keys()]);    
    const [isStarted, setIsStarted] = useState(false);
    console.log('is started:', isStarted);


    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles,tileCount);
        setTiles(shuffledTiles);
        setSteps(0);
    }

    const swapTiles = (tileIndex) => {
        if (!hasWon && canSwap(tileIndex, tiles.indexOf(tiles.length - 1), grid)) {
          const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
          setTiles(swappedTiles)
          setSteps(steps + 1);
        }
    }
    
    const handleTileClick = (index) => swapTiles(index); 

    const handleShuffleClick = () => shuffleTiles();  

    const handleStartClick = () => {
        shuffleTiles();
        setIsStarted(true);
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
                        imgTile={imgUrl}
                        handleTileClick={handleTileClick}
                    />
                ))}
            </div>
            <div className="board-footer" style={{ width: `${boardWidth}px`, margin:'0 auto'}}>
                <div className="step-counter w-auto stat place-items-center p-2">
                    <div className="stat-title">Total Movimientos:</div>
                    <div className="stat-value text-secondary">{steps}</div>
                </div>
                {hasWon && isStarted && <div className="toast toast-center">
                        <div className="has-won alert alert-success">Puzzle solved 🧠 🎉</div>
                    </div>
                }
                {!isStarted ?
                    (<button className="btn btn-secondary start-btn" onClick={() => handleStartClick()}>Iniciar Juego</button>) :
                    (<button className="btn btn-warning" onClick={() => handleShuffleClick()}>Reset</button>)
                }
            </div>
        </>
    );
}

export default Board