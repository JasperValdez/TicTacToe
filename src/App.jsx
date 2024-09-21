import { useState, useEffect } from "react";
import PlayerLabel from "./component/PlayerLabel";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Game board state
  const [isXNext, setIsXNext] = useState(true); // Determines if it's Player X's turn
  const [scores, setScores] = useState({ X: 0, O: 0 }); // Scores for both players
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Check for a winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Return the winner ('X' or 'O')
      }
    }
    return null; // No winner yet
  };

  const handleClick = (index) => {
    const boardCopy = [...board];

    // Return if there's a winner or the square is already filled
    if (calculateWinner(board) || boardCopy[index]) return;

    // Assign 'X' or 'O' to the square based on the player's turn
    boardCopy[index] = isXNext ? "X" : "O";
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  };

  // Check for a winner after every turn
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      const newScores = { ...scores };
      newScores[winner]++;
      setScores(newScores);
    }
  }, [board]);

  // Reset the game board
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const winner = calculateWinner(board); // Check if there's a winner
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`; // Display the game status

  //////////
  const [player1, setPlayer1Label] = useState("Player1");
  const [player1BtnCycle, setPlayer1BtnCycle] = useState(true);

  const handlePlayer1Label = (e) => {
    setPlayer1Label(e.target.value);
  };

  const handlePlayer1BtnCLick = () => {
    setPlayer1BtnCycle(!player1BtnCycle);
  };

  const [player2, setPlayer2Label] = useState("Player2");
  const [player2BtnCycle, setPlayer2BtnCycle] = useState(true);

  const handlePlayer2Label = (e) => {
    setPlayer2Label(e.target.value);
  };

  const handlePlayer2BtnCLick = () => {
    setPlayer2BtnCycle(!player2BtnCycle);
  };
  return (
    <>
    <div className="h-screen w-full bg-black">
    <div  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <button
          onClick={toggleDarkMode}
          className="px-4 py-2 size-[70px] bg-blue-600 absolute right-5 bottom-5 text-white font-bold rounded hover:bg-blue-800 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors duration-500"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        
        <div className="flex justify-between w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
        <button onClick={resetGame}>reset</button>
      </div>
      <div className="flex justify-center  ">
      
        <PlayerLabel
          playerLabel={player1}
          playerBtnCycle={player1BtnCycle}
          label={"icon-close"}
          handlePlayerBtnClick={handlePlayer1BtnCLick}
          handlePlayerLabel={handlePlayer1Label}
        />
        <PlayerLabel
          playerLabel={player2}
          playerBtnCycle={player2BtnCycle}
          label={"icon-circle"}
          handlePlayerBtnClick={handlePlayer2BtnCLick}
          handlePlayerLabel={handlePlayer2Label}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 my-[100px]">

        {board.map((square, index) => (
          <button 
            key={index} 
            className="w-24 h-24 bg-white dark:bg-gray-700 border-2 border-gray-600 text-3xl font-bold flex items-center justify-center transition-colors duration-500"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      </div>
      </div>
    </>
  );
}
export default App;
