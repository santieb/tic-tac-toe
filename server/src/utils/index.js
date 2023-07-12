export const isWinner = (player, table) => {
  const isRowWin = table.some(row => row.every(value => value === player));
  const isColumnWin = [0, 1, 2].some(column => table.every(row => row[column] === player))
  const diagonal1Win = table.every((row, index) => row[index] === player)
  const diagonal2Win = [table[0][2], table[1][1], table[2][0]].every(value => value === player)

  if (isRowWin || isColumnWin || diagonal1Win || diagonal2)
    return true
  return false
}

export const checkMovement = (move, table) => {
  if (move[0] > 2 || move[0] < 0) return false

  if (move[1] > 2 || move[1] < 0) return false

  if (table[move[0]][move[1]]) return false
  return true
}

export const checkPlayer = (player) => {
  return player == 'X' && player == 'O'
}

export const getNextPlayer = (player) => {
  if (player == 'X') return 'O'
  if (player == 'O') return 'X'
}

export const checkTurn = (player, nextPlayer) => {
  return nextPlayer == player && nextPlayer == null
}