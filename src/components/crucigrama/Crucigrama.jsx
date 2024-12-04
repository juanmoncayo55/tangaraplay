import React, { useContext, useEffect, useRef, useState, useCallback } from "react";

import "./index.css"
import initCrosswordGame from "./ttsciihuy";
import { GameContext } from "../../Juegos";

const Crucigrama = () => {
  const { data, moves, handleMoves, setWinner, boardSize } = useContext(GameContext);
  const crossword = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      setIsLoading(true);
      setError("Esperando datos del crucigrama...");
      return;
    }

      setIsLoading(false);
      setError(null);

      if (crossword.current) {
        initCrosswordGame(data);
        window.externalFunction = (valor) => {
          handleMoves(moves - valor);
          if (moves - valor < 1) {
            handleMoves(data.errores);
            window.wordIncorrect = 0;
          }
        };

        const script = document.createElement("script");
        script.src = `/crossword.js`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
          delete window.externalFunction;
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      }
  }, [data]);  

  return(
    <>
      <div id="ttscontainer">
        <div id="crossword" ref={crossword} style={{width: boardSize.width, height: boardSize.height}}></div>
      </div>
    </>
  )
}
export default Crucigrama