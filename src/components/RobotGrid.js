import './RobotGrid.css'
import Grid from 'react-css-grid'
import robot from '../robot.png'

const generateGrid = () => {
  const items = []
  for (let i = 0; i < 5 * 5; i++) {
    items.push({ index: i })
  }
  return items
}

const grid = generateGrid()

function RobotGrid({ robotX, robotY, robotDirection }) {
  const robotIndex = robotX + 5 * robotY
  let transform = ''
  switch (robotDirection) {
    case 'NORTH':
      transform = 'rotate(-90deg)'
      break
    case 'SOUTH':
      transform = 'rotate(90deg)'
      break
    case 'EAST':
      transform = ''
      break
    case 'WEST':
      transform = 'scaleX(-1)'
      break
  }
  return (
    <div className="grid">
      <Grid width={60} gap={0}>
        {grid.map((item) => (
          <div
            key={item.index}
            style={{
              height: '60px',
              backgroundColor: item.index % 2 === 0 ? '#DCDCDC' : 'white',
            }}
          >
            {item.index === robotIndex ? (
              <img
                src={robot}
                style={{
                  objectFit: 'contain',
                  height: '100%',
                  width: '100%',
                  transform: transform,
                }}
              />
            ) : null}
          </div>
        ))}
      </Grid>
    </div>
  )
}

export default RobotGrid
