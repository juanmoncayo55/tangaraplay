import React, { useState, useEffect } from "react";
import {WordPuzzleComponent} from "word-search-puzzle/WordPuzzleComponent";
import "./crucigrama.css"

//const answerWords = ["popayan", "territorio", "economia", "cultura", "diversidad"];
const answerWords = ["example", "gurkan"];
const matrix = [
  ["a", "b", "c", "d", "e", "g", "x", "t", "e"],
  ["a", "s", "h", "i", "j", "e", "e", "e", "c"],
  ["a", "g", "m", "n", "o", "x", "q", "s", "i"],
  ["s", "g", "u", "r", "k", "a", "n", "t", "m"],
  ["k", "i", "v", "w", "x", "m", "e", "y", "b"],
  ["i", "k", "m", "n", "o", "p", "v", "d", "o"],
  ["k", "q", "r", "s", "t", "l", "b", "a", "m"],
  ["y", "t", "e", "s", "t", "e", "e", "t", "e"],
];

const WordSearch = () => {
  const [isSelecting, setIsSelecting] = useState(false);

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [markedLetters, setMarkedLetters] = useState([]);
  const [containerMatrix, setContainerMatrix] = useState([]);

  /*useEffect(() => {
    const requestUrlApi = () => {
      fetch("http://localhost:4000/word-search")
        .then(res => res.json())
        .then(res => {
          setContainerMatrix(res.grid);
        })
    }
    requestUrlApi()
  }, [])*/


  return(
    <>
      <WordPuzzleComponent
        design={{
          markedBackgroundColor: "#00C3FF",
          selectedBackgroundColor: "white",
          hoveredBackgroundColor: "rgb(0, 218, 145)",
          backgroundColor: "rgb(1, 146, 98)",
          fontFamily: "monospace",
          fontWeight: "",
          fontSize: "2.5rem",
          markedForeColor: "white",
          selectedForeColor: "rgb(1, 146, 98)",
          hoveredForeColor: "white",
          foreColor: "white",
        }}
        options={{
          answerWords: answerWords,
          matrix: matrix,
          isSelecting: isSelecting,
          selectedLetters: selectedLetters,
          setSelectedLetters: setSelectedLetters,
          markedLetters: markedLetters,
          setMarkedLetters: setMarkedLetters,
          setIsSelecting: setIsSelecting,
          availablePaths: [
            // "right2left",
            "left2right",
            "top2bottom",
            //"bottom2top",
          ],
        }}
      />
    </>
  )
}

export default WordSearch