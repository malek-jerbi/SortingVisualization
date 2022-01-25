import logo from './logo.svg'
import './App.css'
import { useEffect, useState, useRef } from 'react'
import Bars from './Components/Bars'
import Form from './Components/Form'

function App() {
  const [linesArray, setLinesArray] = useState([])
  const endOfArray = useRef(99)
  const linesIndex = useRef(1)
  const firstUpdate = useRef(true)
  const buttonPressed = useRef(false)
  const reset = useRef(false)
  useEffect(() => {
    console.log('STARTT')
    firstUpdate.current = true
    buttonPressed.current = false
    linesIndex.current = 1
    endOfArray.current = 99
    const arr = []
    for (let i = 0; i < 100; i++) {
      arr.push({ height: Math.ceil(Math.random() * 30), color: 'gray' })
    }
    setLinesArray(arr)
  }, [reset.current])

  useEffect(async () => {
    if (endOfArray.current === 0) return
    if (firstUpdate.current) {
      return
    }
    if (linesIndex.current > endOfArray.current) {
      endOfArray.current--
      linesIndex.current = 1
      fillLines()
      return
    }

    await sleep(30)
    if (
      linesArray[linesIndex.current].height >
      linesArray[linesIndex.current - 1].height
    ) {
      moveToNext()
    } else {
      swap()
    }
  }, [linesArray])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!buttonPressed.current) {
      if (event.target.filter.value === 'bubble') {
        firstUpdate.current = false
        fillLines()
        buttonPressed.current = true
      }
    }
    console.log('zzzzzz', event.target.filter.value)
  }
  function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
  }
  const swap = () => {
    let temp
    const arr = [...linesArray]
    temp = {
      height: arr[linesIndex.current].height,
      color: arr[linesIndex.current].color,
    }
    arr[linesIndex.current] = {
      height: arr[linesIndex.current - 1].height,
      color: linesIndex.current === endOfArray.current ? 'green' : 'blue',
    }
    arr[linesIndex.current - 1] = temp
    setLinesArray(arr)
    linesIndex.current++
  }

  const moveToNext = () => {
    const tmpArr = [...linesArray]
    tmpArr[linesIndex.current] = {
      height: linesArray[linesIndex.current].height,
      color: linesIndex.current === endOfArray.current ? 'green' : 'blue',
    }
    tmpArr[linesIndex.current - 1] = {
      height: linesArray[linesIndex.current - 1].height,
      color: 'gray',
    }
    setLinesArray(tmpArr)
    linesIndex.current++
  }

  const fillLines = async () => {
    const tmpArr = [...linesArray]
    tmpArr[0] = {
      height: linesArray[0].height,
      color: 'blue',
    }
    setLinesArray(tmpArr)
  }

  const resetButton = () => {
    reset.current = !reset.current
    console.log(reset.current)
  }

  return (
    <div className='App'>
      <h1>Sorting Visualization</h1>
      <Form handleSubmit={handleSubmit} resetButton={resetButton} />
      <Bars arr={linesArray} />
    </div>
  )
}

export default App
