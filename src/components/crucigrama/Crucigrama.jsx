import React, { useContext, useEffect, useRef, useState, useCallback } from "react";

import "./index.css"
import initCrosswordGame from "./ttsciihuy";
import { GameContext } from "../../Juegos";

const Crucigrama = () => {
  const { data, moves, handleMoves, setWinner, boardSize } = useContext(GameContext);
  const crossword = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  console.log(data)
  useEffect(() => {
    const cleanup = () => {
      const script = document.querySelector('script[src="/crossword.js"]');
      if (script) {
        document.body.removeChild(script);
      }
      delete window.externalFunction;
      delete window.wordIncorrect;
      setIsInitialized(false);
    };


    // Solo intentar inicializar si tenemos datos válidos
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      setIsLoading(true);
      setError(null);

      try {
        // Inicializar el juego
        initCrosswordGame(data);
        
        // Configurar la función externa
        window.externalFunction = (valor) => {
          handleMoves(moves - valor);
          if (moves - valor < 1) {
            handleMoves(data.errores);
            window.wordIncorrect = 0;
          }
        };

        // Cargar el script
        const script = document.createElement("script");
        script.src = `/crossword.js`;
        script.async = true;
        
        script.onload = () => {
          setIsLoading(false);
          setIsInitialized(true);
        };

        script.onerror = () => {
          setError("Error al cargar el script del crucigrama");
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (err) {
        setError("Error al inicializar el crucigrama");
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setError("Esperando datos del crucigrama...");
    }

    // Cleanup cuando el componente se desmonta o cuando data cambia
    return cleanup;
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-message">Cargando crucigrama...</p>
      </div>
    );
  }

  return(
    <>
      <div id="ttscontainer">
        <div id="crossword" style={{width: boardSize.width, height: boardSize.height}}></div>
      </div>
    </>
  )
}
export default Crucigrama