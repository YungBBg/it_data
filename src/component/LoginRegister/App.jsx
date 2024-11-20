import { useState } from 'react'
import './App.css'
import './index.css'
import Login from './Login'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='Login'>
      <Login/>
    </div>
  )
}

export default App
 