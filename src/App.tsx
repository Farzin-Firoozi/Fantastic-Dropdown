import { useState } from 'react'
import Dropdown from './components/dropdown'

const options = [
  'Education 🎓',
  'Science ⚗️',
  'Art 🎭',
  'Sport ⚽️',
  'Games 🎮',
  'Health 🏥',
  'Driving 🚘',
  'Flying ✈️',
  'Riding 🐎',
]

function App() {
  const [option, setOption] = useState('')

  return (
    <>
      <form style={{ maxWidth: 300 }}>
        <Dropdown value={option} onChange={setOption} options={options} />
      </form>
    </>
  )
}

export default App
