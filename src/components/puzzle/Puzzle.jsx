import Board from "./Board"

function Puzzle({numeroColumnas,urlImagen}) {

  return (
    <>
      <Board grid={numeroColumnas} imgUrl={urlImagen} />
    </>
  )
}

export default Puzzle