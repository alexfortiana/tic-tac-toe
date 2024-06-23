import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./contants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal";


 




function App() {


  const [board, setBoard] = useState(() =>{
    const board = window.localStorage.getItem('board');
    return board ? JSON.parse(board) : Array(9).fill(null);
  
  });

  const [turn, setTurn] = useState(() =>{
    const turn = window.localStorage.getItem('turn');
    return turn ? turn : TURNS.X;
  
  });
  const [winner, setWinner] = useState(null);

  

  const resetGame = () => {

    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');

  }

 


  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);



    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    const newWinner = checkWinnerFrom(newBoard);
   

    if(newWinner){
      confetti();
      setWinner(newWinner);
    } else if(checkEndGame(newBoard)){
      setWinner(false);
    }


  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section
        className="game">
        {
          board.map((e, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {e}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
        
      <WinnerModal winner={winner} resetGame={resetGame}/>
        
    </main>
  )

}

export default App
