import React, { useState, useEffect, useCallback } from "react";
import {WordPuzzleComponent} from "word-search-puzzle/WordPuzzleComponent";
import { useSearchParams } from 'react-router-dom';
import Gameboard from "./WordSearch/components/Gameboard";
import styles from "./wordsearch.module.css";

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

const SIZE_VALIDATION_REGEX = /^[1-2]?[0-9]\*[1-2]?[0-9]$/s;
const DEFAULT_SIZE = [13, 15];

const WordSearch = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [query, setQuery] = useSearchParams({ size: '13*15' });

  const [selectedLetters, setSelectedLetters] = useState([]);
  const [markedLetters, setMarkedLetters] = useState([]);
  const [containerMatrix, setContainerMatrix] = useState([]);

  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

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

  const getValidSize = useCallback(() => {
    const _size = query.get('size')?.trim();
    return !_size || !SIZE_VALIDATION_REGEX.test(_size) ? DEFAULT_SIZE.join('*') : _size;
  }, [query]);

  useEffect(() => {
    setQuery(
      (prev) => {
        return { ...prev, size: getValidSize() };
      },
      { replace: true }
    );
  }, [getValidSize, setQuery]);

  const size = getValidSize().split('*');
  return(
    <>
      <main>
        <Gameboard size={size} />
      </main>
    </>
  )
}

/*
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
*/

export default WordSearch