import express from 'express'
import { verifyWin, verifyMove } from './utils/index.js'
import { table } from './table.js'

const app = express()
app.use(express.json())

app.post('/api/move', (req, res) => {
  const { move, player } = req.body

  if (player !== 'x' && player !== 'o') 
    return res.status(400).json('bad request')

  const response  = verifyMove(move)
  if (response?.error) 
    return res.status(400).json('bad request')

  const isWinner = verifyWin(player, move)
  if (isWinner) return res.send(isWinner)

  res.status(200).json({
    move, player, table
  })
})

app.listen(3000)
console.log('listening on port 3000')