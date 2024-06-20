import { useState } from "react";

const TURNS = {
  X: 'X',
  O: 'O'
}

const WINNER_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
]

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index);

  }

  return (
    <div className={className} onClick={handleClick} >
      {children}
    </div>
  )
}

function App() {


  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
  
        return boardToCheck[a];
      }
    }

    return null

  }

  const resetgame = () => {

    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

  }

  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);



    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    

    const newWinner = checkWinner(newBoard);
   

    if(newWinner){
      setWinner(newWinner);
    }


  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
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
        

     { winner !== null && ( 
        <section className="winner">
            <div className="text">
              <h2>
                {winner === false ? 'empate'
                : 'ganó:'}
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetgame}>Empezar de nuevo</button>
              </footer>            
         
            </div>

        </section> 
        )
      } 
    </main>
  )

}

export default App
