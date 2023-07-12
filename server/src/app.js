import express from 'express'
import cors from 'cors'
import { isWinner, checkMovement, checkPlayer, getNextPlayer, checkTurn } from './utils/index.js'
import { rooms } from './models/rooms.js'
import cleanTable from './models/table.js' 

const app = express()
app.use(express.json())

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.post('/api/rooms', (req, res) => {
  try {
    const room = {
      id: Date.now(),
      nextPlayer: null,
      table: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    }

    rooms.push(room)
    res.json(room)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.get('/api/rooms/:roomId', (req, res) => {
  try {
    const { roomId } = req.params

    const room = rooms.find(room => room.id == +roomId)
    if (!room) throw new Error('Room not exist')

    res.send(room)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.post('/api/rooms/:roomId/move', (req, res) => {
  try {
    const { move, player } = req.body
    const { roomId } = req.params

    const room = rooms.find(room => room.id == +roomId)
    if (!room) throw new Error('Room not exist')

    const { table, nextPlayer } = room

    if (!checkPlayer(player))
      throw new Error('Only player X and O are allowed')

    if (!checkTurn(player, nextPlayer))
      throw new Error('Its not your turn')

    if (!checkMovement(move, table))
      throw new Error('That movement is not allowed')

    const roomIndex = rooms.findIndex((room) => room.id === +roomId);
    const updatedTable = [...table];
    updatedTable[move[0]][move[1]] = player;

    const updatedRoom = {
      ...room,
      table: updatedTable,
      nextPlayer: getNextPlayer(player),
    };

    rooms[roomIndex] = updatedRoom;

    const currentPlayerIsWinner = isWinner(player, move, table)
    if (currentPlayerIsWinner) {
      const resetRoom = {
        ...room,
        table: cleanTable,
        nextPlayer: null,
      };
  
      rooms[roomIndex] = resetRoom;
      return res.send({ updatedRoom, winner: player })
    }

    res.status(200).json(updatedRoom)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.listen(3000)
console.log('listening on port 3000')