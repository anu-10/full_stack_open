import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (value) => {
    if (value === 'good') {
      setGood(prev => prev + 1)
    } else if (value === 'neutral') {
      setNeutral(prev => prev + 1)
    } else if (value === 'bad') {
      setBad(prev => prev + 1)
    }
  }

  return (
    <div>
      <h2>give feedback<br/></h2>
      <Button handleClick={handleClick} text="good" />
      <Button handleClick={handleClick} text="neutral" />
      <Button handleClick={handleClick} text="bad" />
      <Statistics props={{good, neutral, bad}} />
    </div>
  )
}


export default App