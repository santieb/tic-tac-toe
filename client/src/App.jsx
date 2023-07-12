import './App.css'
import Board from './components/Board'

function App() {

  const handleRoom = async () => {
    const res = await fetch('http://localhost:3000/api/rooms', { method: "POST", })
    const data = await res.json()
    console.log(data)
  }

  return (
    <>
      <button onClick={() => handleRoom()}>
        Create room
      </button>
      <Board />
    </>
  )
}

export default App
