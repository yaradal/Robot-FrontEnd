import { useState } from 'react'
import './App.css'
import RobotGrid from './components/RobotGrid'

const apiUrl = 'http://localhost:8080/robot/move'

const defaultCommand = `POSITION 1 3 EAST
FORWARD 3
WAIT
TURNAROUND
FORWARD 1
RIGHT
FORWARD 2`

function App() {
  const [robotPosition, setRobotPosition] = useState({
    robotX: 0,
    robotY: 0,
    robotDirection: 'EAST',
  })
  const [command, setCommand] = useState(defaultCommand)

  const callApi = async function () {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: command,
    })
    const data = await res.json()
    setRobotPosition({
      robotX: data.x,
      robotY: data.y,
      robotDirection: data.direction,
    })
  }

  return (
    <div className="container">
      <RobotGrid
        robotX={robotPosition.robotX}
        robotY={robotPosition.robotY}
        robotDirection={robotPosition.robotDirection}
      />
      <div className="commandContainer" style={{ height: '100%' }}>
        <textarea
          cols="40"
          rows="10"
          defaultValue={defaultCommand}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button className="button" onClick={callApi}>
          Send
        </button>
      </div>
    </div>
  )
}

export default App
