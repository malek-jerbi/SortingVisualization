import { useState } from 'react'
const Form = ({ handleSubmit, resetButton, speed, setSpeed }) => {
  const handleSpeed = (event) => {
    event.preventDefault()

    setSpeed(event.target.value)
  }
  const [selected, setSelected] = useState(false)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='radio'
            name='filter' // a button group so
            value={'bubble'}
            onClick={() => setSelected(true)}
          />
          Bubble Sort
          <input
            type='radio'
            name='filter' //same name "filter"
            value={'lol'}
            disabled={true}
          />
          Merge Sort{' '}
          <input
            type='radio'
            name='filter' //so that they form
            value={'lol'}
            disabled={true}
          />
          Selection Sort{' '}
          <input
            type='radio'
            name='filter' // a button group so
            value={'lol'}
            disabled={true}
          />
          InsertionSort
        </div>
        <div>
          speed:
          <input
            type='range'
            min='0'
            max='100'
            value={speed}
            onChange={handleSpeed}
          />
          {speed}
        </div>
        <div>
          <button disabled={!selected} type='submit'>
            {' '}
            start
          </button>
        </div>
      </form>
      <button disabled={!selected} onClick={resetButton}>
        reset
      </button>
    </div>
  )
}
export default Form
