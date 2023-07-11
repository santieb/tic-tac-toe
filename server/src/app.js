import express from 'express'
import { verifyWin, verifyMove } from './utils/index.js'
import { table } from './table.js'

const app = express()
app.use(express.json())

let lastPlayer = ''

app.post('/api/move', (req, res) => {
  try {
    const { move, player } = req.body

    if (player !== 'x' && player !== 'o')
      throw new Error('Only player X and O are allowed')

    if (lastPlayer == player)
      throw new Error('Its not your turn')

    const response = verifyMove(move)
    if (response?.error)
      throw new Error('That movement is not allowed')

    const isWinner = verifyWin(player, move)
    if (isWinner) return res.send(isWinner)

    lastPlayer = player
    res.status(200).json({
      move, player, table
    })
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.listen(3000)
console.log('listening on port 3000')