import './App.css'
import { useEffect, useState, useRef } from 'react'
import Bars from './Components/Bars'
import Form from './Components/Form'

function App() {
  const n = 100 // array size
  const [linesArray, setLinesArray] = useState([])
  const [speed, setSpeed] = useState(30)
  const [secondUE, setSecondUE] = useState(false)
  const endOfArray = useRef(n - 1)
  const linesIndex = useRef(1)
  const firstUpdate = useRef(true)
  const buttonPressed = useRef(false)
  const [reset, setReset] = useState(false)
  const [wait, setWait] = useState(3)

  useEffect(async () => {
    const arr = []
    for (let i = 0; i < n; i++) {
      arr.push({ height: Math.ceil(Math.random() * 30), color: 'gray' })
    }

    await sleep(1000)
    setLinesArray(arr)
  }, [reset])

  useEffect(async () => {
    if (!secondUE) return
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

    await sleep(speed)
    if (
      linesArray[linesIndex.current].height >
      linesArray[linesIndex.current - 1].height
    ) {
      moveToNext()
    } else {
      console.log(linesIndex.current)
      swap()
    }
  }, [linesArray])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!buttonPressed.current) {
      if (event.target.filter.value === 'bubble') {
        setSecondUE(true)
        firstUpdate.current = false
        buttonPressed.current = true
        fillLines()
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
    returnTime()
    console.log('STARTT')

    setSecondUE(false)
    firstUpdate.current = true
    buttonPressed.current = false
    linesIndex.current = 1
    endOfArray.current = n - 1
    setReset(!reset)

    console.log(reset.current)
  }
  const returnTime = () => {
    setInterval(() => {
      console.log(wait)
      setWait(2)
    }, 1000)
  }
  return (
    <div className='App'>
      <h1>Sorting Visualization</h1>
      <Form
        handleSubmit={handleSubmit}
        resetButton={resetButton}
        speed={speed}
        setSpeed={setSpeed}
      />
      <Bars arr={linesArray} />
      <div></div>
      <div></div>
    </div>
  )
}
export default App
