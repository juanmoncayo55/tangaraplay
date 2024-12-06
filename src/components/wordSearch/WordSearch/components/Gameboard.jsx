import React, { useState, useLayoutEffect, useRef, useEffect, useContext } from 'react';
import Table from './Table';
import createPuzzle from '../utils/createPuzzle';
import useEventListener from '../hooks/useEventListener';
import { GameContext } from '../../../../Juegos';

export default function Gameboard({ size = [13, 15], getListWord }) {
  const [debugMode, setDebugMode] = useState(false);
  const [table, setTable] = useState([]);
  const [wordlist, setWordlist] = useState([]);
  const [windowSize, setWindowSize] = useState([]);
  const gameOver = useRef(false);
  const gameboardRef = useRef();

  const {data, setListSopa, setWinner} = useContext(GameContext);

  // Scale gameboard to fit small screens
  useLayoutEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  useLayoutEffect(() => {
    if (windowSize.length === 0) return;
    const gameboard = gameboardRef.current;
    const parent = gameboard.closest('main');
    const boardWidth = gameboard.offsetWidth;
    const boardHeight = gameboard.offsetHeight;
    const screenWidth = parent.offsetWidth;
    const screenHeight = parent.offsetHeight;

    let ratio = 1;

    if (screenHeight < boardHeight) ratio = Math.floor((screenHeight / boardHeight) * 100) / 100;
    if (screenWidth < boardWidth) ratio = Math.floor((screenWidth / boardWidth) * 100) / 100;

    gameboard.style.setProperty('--scale-ratio', ratio);
  }, [windowSize]);

  useEventListener('resize', (e) => {
    setWindowSize([e.target.innerWidth, e.target.innerHeight]);
  });
  // ctl + alt + "D" for toggling debug mode
  // Basicly a cheat code :)
  useEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.keyCode === 68) setDebugMode(!debugMode);
  });

  useLayoutEffect(() => {
    const [_table, _wordlist] = createPuzzle(size[0], size[1], data);
    setTable(_table);
    setWordlist(_wordlist);
    getListWord(_wordlist)
    setListSopa(_wordlist)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = () => {
    const [_table, _wordlist] = createPuzzle(size[0], size[1], data);
    setTable(_table);
    setWordlist(_wordlist);
    getListWord(_wordlist)
    setListSopa(_wordlist)
  }



  return (
    <div id='gameboard' style={{ position: 'relative' }}>
      <div ref={gameboardRef} id='gameboard-center' className='user-select-none bg-white'>
        <Table
          {...{
            table,
            gameOver,
            debugMode,
            size,
            wordlist,
            setWordlist,
            setListSopa,
            setWinner,
            windowSize
          }}
          resetGame={resetGame}
        />
      </div>
    </div>
  );
  
}