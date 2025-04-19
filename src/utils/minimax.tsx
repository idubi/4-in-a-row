
// File: src/utils/minimax.ts
export function getValidMoves(board: any[][]): number[] {
  return board[0].map((_, c) => c).filter(c => board[0][c] === null);
}

export function simulateMove(board: any[][], col: number, player: string): any[][] {
  const newBoard = board.map(row => [...row]);
  for (let r = board.length - 1; r >= 0; r--) {
    if (!newBoard[r][col]) {
      newBoard[r][col] = player;
      break;
    }
  }
  return newBoard;
}

export function evaluate(board: any[][], player: string): number {
  const opponent = player === 'user' ? 'ai' : 'user';
  let score = 0;

  function countInLine(line: string[]): number {
    const joined = line.join('');
    if (joined.includes(player.repeat(4))) return 100000;
    if (joined.includes(opponent.repeat(4))) return -100000;
    if (joined.includes(player.repeat(3))) return 1000;
    if (joined.includes(player.repeat(2))) return 100;
    if (joined.includes(opponent.repeat(3))) return -1000;
    return 0;
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length - 3; col++) {
      score += countInLine(board[row].slice(col, col + 4));
    }
  }
  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row < board.length - 3; row++) {
      const line = [0, 1, 2, 3].map(i => board[row + i][col]);
      score += countInLine(line);
    }
  }
  for (let row = 0; row < board.length - 3; row++) {
    for (let col = 0; col < board[0].length - 3; col++) {
      const diag1 = [0, 1, 2, 3].map(i => board[row + i][col + i]);
      const diag2 = [0, 1, 2, 3].map(i => board[row + 3 - i][col + i]);
      score += countInLine(diag1) + countInLine(diag2);
    }
  }
  return score;
}

export function minimax(board: any[][], depth: number, maximizing: boolean, player: string, alpha: number, beta: number): [number | null, number] {
  const validMoves = getValidMoves(board);
  const opponent = player === 'user' ? 'ai' : 'user';
  if (depth === 0 || validMoves.length === 0) {
    return [null, evaluate(board, player)];
  }

  let bestScore = maximizing ? -Infinity : Infinity;
  let bestCol = validMoves[0];

  for (let col of validMoves) {
    const newBoard = simulateMove(board, col, maximizing ? player : opponent);
    const [_, score] = minimax(newBoard, depth - 1, !maximizing, player, alpha, beta);
    if (maximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestCol = col;
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestCol = col;
      }
      beta = Math.min(beta, bestScore);
    }
    if (beta <= alpha) break;
  }
  return [bestCol, bestScore];
}
