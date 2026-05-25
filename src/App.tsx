import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, X, Circle, Trophy, Sparkles } from 'lucide-react'
import './App.css'

type Player = "X" | "O"

interface WinningResult {
  winner: Player
  pattern: number[]
}

type BoardState = (Player | null)[]

export default function App() {
  const initialBoardState: BoardState = Array(9).fill(null)

  const [board, setBoard] = useState<BoardState>(initialBoardState)
  const [winner, setWinner] = useState<WinningResult | null>(null)
  const [currPlayer, setCurrPlayer] = useState<Player>("X")
  const [draw, setDraw] = useState(false)

  const handleCellClick = (index: number) => {
    if (winner || draw || board[index] !== null) return

    const boardCopy = [...board]
    boardCopy[index] = currPlayer
    setBoard(boardCopy)

    const result = checkWinner(boardCopy)
    if (result) {
      setWinner(result)
      return
    }

    if (!boardCopy.includes(null)) {
      setDraw(true)
      return
    }

    setCurrPlayer(currPlayer === "X" ? "O" : "X")
  }

  const checkWinner = (boardCopy: BoardState): WinningResult | null => {
    const winnerPattern = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6],            // Diagonals
    ]

    for (const pattern of winnerPattern) {
      const [a, b, c] = pattern
      if (boardCopy[a] && boardCopy[a] === boardCopy[b] && boardCopy[b] === boardCopy[c]) {
        return { winner: boardCopy[a], pattern }
      }
    }
    return null
  }

  const handleReset = () => {
    setBoard(initialBoardState)
    setCurrPlayer("X")
    setWinner(null)
    setDraw(false)
  }

  const getStrikeLineClass = (pattern: number[]) => {
    const patternStr = pattern.join(',')
    switch (patternStr) {
      case '0,1,2': return 'top-[16%] left-[5%] w-[90%] h-1.5'
      case '3,4,5': return 'top-1/2 left-[5%] w-[90%] h-1.5 -translate-y-1/2'
      case '6,7,8': return 'bottom-[16%] left-[5%] w-[90%] h-1.5'
      case '0,3,6': return 'left-[16%] top-[5%] h-[90%] w-1.5'
      case '1,4,7': return 'left-1/2 top-[5%] h-[90%] w-1.5 -translate-x-1/2'
      case '2,5,8': return 'right-[16%] top-[5%] h-[90%] w-1.5'
      case '0,4,8': return 'top-1/2 left-1/2 w-[125%] h-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45'
      case '2,4,6': return 'top-1/2 left-1/2 w-[125%] h-1.5 -translate-x-1/2 -translate-y-1/2 -rotate-45'
      default: return ''
    }
  }

  // Neon theme colors for players
  const playerColors = {
    X: "text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]",
    O: "text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]"
  }

  const PlayerIcon = ({ player, className = "" }: { player: Player, className?: string }) => {
    if (player === 'X') return <X className={`${playerColors.X} ${className}`} strokeWidth={2.5} />
    return <Circle className={`${playerColors.O} ${className}`} strokeWidth={2.5} />
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-950 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* Aurora Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] bg-cyan-600/30 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[60vw] h-[60vw] bg-fuchsia-600/20 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], y: [0, -100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] bg-blue-600/20 blur-[100px] rounded-full" 
        />
      </div>

      {/* Main Spatial Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="backdrop-blur-3xl bg-white/2 border border-white/10 rounded-4xl shadow-2xl shadow-black/50 p-6 sm:p-10 flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
          
          {/* Left Column: Board */}
          <div className="relative w-full max-w-100px aspect-square shrink-0">
            {/* The Grid */}
            <div className="grid grid-cols-3 gap-3 w-full h-full p-3 bg-black/20 rounded-3xl border border-white/5 shadow-inner">
              {board.map((cell, index) => {
                const isWinningCell = winner?.pattern.includes(index)
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    whileHover={!cell && !winner && !draw ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" } : {}}
                    whileTap={!winner && !draw ? { scale: 0.95 } : {}}
                    animate={{
                      scale: isWinningCell ? [1, 1.1, 1] : 1,
                      opacity: winner && !isWinningCell ? 0.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-center justify-center w-full h-full rounded-2xl bg-white/3] border border-white/10 shadow-lg cursor-pointer disabled:cursor-default"
                    disabled={winner !== null || draw}
                  >
                    <AnimatePresence mode="popLayout">
                      {cell && (
                        <motion.div
                          initial={{ scale: 0, rotate: cell === 'X' ? -90 : 90, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <PlayerIcon player={cell} className="w-16 h-16 sm:w-20 sm:h-20" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
            </div>

            {/* Neon Laser Strike Line */}
            {winner && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className={`absolute origin-center z-20 rounded-full laser-line ${winner.winner === 'X' ? 'bg-cyan-400 text-cyan-400' : 'bg-fuchsia-400 text-fuchsia-400'} ${getStrikeLineClass(winner.pattern)}`}
              />
            )}
          </div>

          {/* Right Column: UI & Controls */}
          <div className="flex flex-col justify-between w-full h-full py-4">
            
            {/* Header */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
                Tic Tac Toe
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </h1>
              <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">
                Spatial Edition
              </p>
            </div>

            {/* Game Status Box */}
            <div className="my-8">
              <AnimatePresence mode="wait">
                {winner ? (
                  <motion.div
                    key="winner"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${winner.winner === 'X' ? 'bg-cyan-400' : 'bg-fuchsia-500'}`} />
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4" /> Match Complete
                    </h3>
                    <div className="flex items-center gap-4">
                      <PlayerIcon player={winner.winner} className="w-10 h-10" />
                      <span className="text-3xl font-bold text-white">Wins!</span>
                    </div>
                  </motion.div>
                ) : draw ? (
                  <motion.div
                    key="draw"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">Match Complete</h3>
                    <span className="text-3xl font-bold text-white">It's a Draw.</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="turn"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                  >
                    <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-4">Awaiting Move</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-medium text-white">Turn:</span>
                      <motion.div 
                        key={currPlayer}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-black/30 p-2 rounded-xl"
                      >
                        <PlayerIcon player={currPlayer} className="w-8 h-8" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reset Button */}
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold tracking-widest uppercase transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              {winner || draw ? "Play Again" : "Reset Board"}
            </motion.button>
            
          </div>
        </div>
      </motion.div>
    </div>
  )
}