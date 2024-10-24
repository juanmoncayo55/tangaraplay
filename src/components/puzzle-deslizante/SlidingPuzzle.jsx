import Board from "./Board"
import "./slidingpuzzle.css"

function SlidingPuzzle({numeroColumnas,urlImagen, maxMovimientos}) {

  return (
    <>
      <Board grid={numeroColumnas} imgUrl={urlImagen} maxSteps={maxMovimientos} />
    </>
  )
}

export default SlidingPuzzle