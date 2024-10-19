import React, {useCallback, useEffect, useRef, useState} from "react";
import Crossword, {CrosswordProvider,DirectionClues,CrosswordGrid, useIpuz} from '@jaredreisinger/react-crossword';


const Crucigrama = () => {
  const crosswordProvider = useRef();
  const [correctQuestion, setcorrectQuestion] = useState(false);
  
  const data = {
    across: {
      3: {
        clue: 'Riqueza que caracteriza al Cauca, con diversidad de costumbres y tradiciones.',
        answer: 'CULTURA',
        row: 5,
        col: 0,
      },
      5: {
        clue: 'Capital del Departamento del Cauca.',
        answer: 'POPAYAN',
        row: 9,
        col: 2,
      }
    },
    down: {
      1: {
        clue: "Área geográfica bajo la administración de la Gobernación del Cauca.",
        answer: "TERRITORIO",
        row: 0,
        col: 3
      },
      2: {
        clue: "Característica del Cauca en términos de etnias, recursos y paisajes.",
        answer: "DIVERSIDAD",
        row: 1,
        col: 5
      },
      4: {
        clue: "Una de las dimensiones que analiza la plataforma Tángara en el Cauca.",
        answer: "ECONOMIA",
        row: 6,
        col: 8
      },
    }
  }

  useEffect(() => {
    if (isSelecting) {
      console.log("selected");
    } else {
      console.log("released");
      const selectedWord = selectedLetters.map((x) => x.letter).join("");
      console.log(selectedWord);
    }
  }, [isSelecting]);

  useEffect(() => {
    console.log("marked letters:", markedLetters);
  }, [markedLetters]);

  const onCorrect = (direction, number, answer) => {
    console.log(`onCorrect: "${direction}", "${number}", "${answer}"`);
    console.log(crosswordProvider)
  }

  const onLoadedCorrect = (answer) => {
    console.log(answer)
  }

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = (isCorrect) => {
    console.log("isCorrect " + isCorrect)
  }

  const crossComplete = (correct) => {
    console.log("crossComplete: "+correct)
  }


  return(
    <>
      <div className="lg:w-7/12 mx-auto">
        <div className="w-full flex items-center justify-center">
          <CrosswordProvider
            data={data}
            ref={crosswordProvider}
            theme={{
              allowNonSquare: true,
              focusBackground: 'white',
              highlightBackground: 'rgb(200,200,200)',
              gridBackground: 'transparent',
              columnBreakpoint: "50px",
              textColor: "green"
            }}
            onCorrect={onCorrect}
            onLoadedCorrect={onLoadedCorrect}
            onCrosswordCorrect={onCrosswordCorrect}
            onCrosswordComplete={crossComplete}
          >
            <div className="flex flex-col lg:flex-row space-x-6 justify-center">
              <div className="w-full lg:w-1/2">
                <CrosswordGrid/>
              </div>
              <div className="w-full lg:w-1/2 text-white flex flex-col justify-center space-y-5">              
                <DirectionClues direction="across"/>
                <DirectionClues direction="down"/>
              </div>
            </div>
          </CrosswordProvider>
        </div>
      </div>
    </>
  )
}

export default Crucigrama

/*
<CrosswordWrapper>
  <Crossword
    data={data}
    ref={crossword}
    theme={{
      allowNonSquare: true,
      focusBackground: 'white',
      highlightBackground: 'rgb(200,200,200)',
      gridBackground: 'transparent',
      columnBreakpoint: "50px"
    }}
    onCorrect={onCorrect}
    onLoadedCorrect={onLoadedCorrect}
    onCrosswordCorrect={onCrosswordCorrect}
   />
 </CrosswordWrapper>
*/