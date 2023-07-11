export const verifyWin = (player, move, table) => {
  for(let i =0;i < 3; i++) {
    if (table[i][0] == player && table[i][1] == player && table[i][2] == player) {
      return 'win row'
    }

    if (table[0][i] == player && table[1][i] == player && table[2][i] == player) {
      return 'win col'
    }
  }

  if (table[0][2] == player && table[1][1] == player && table[2][0] == player) {
    return 'win diagonal'
  }
  
  if (table[0][0] == player && table[1][1] == player && table[0][2] == player) {
    return 'win diagonal 2'
  }
}

export const checkMovement = (move, table) => {
  if (move[0] > 2 || move[0] < 0) return false

  if (move[1] > 2 || move[1] < 0) return false

  if (table[move[0]][move[1]]) return false
  return true
}

export const checkPlayer = (player) => {
  return player !== 'X' && player !== 'O'
}

export const getNextPlayer = (player) => {
  if (player == 'X') return 'O'
  if (player == 'O') return 'X'
}

export const checkTurn = (player, nextPlayer) => {
  return nextPlayer !== player && nextPlayer !== null
}