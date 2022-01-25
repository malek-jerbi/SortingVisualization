import { useState } from 'react'
const Form = ({ handleSubmit, resetButton }) => {
  const [selected, setSelected] = useState(false)
  return (
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
        <button disabled={!selected} type='submit'>
          {' '}
          start
        </button>
        <button disabled={!selected} onClick={resetButton}>
          reset
        </button>
      </div>
    </form>
  )
}
export default Form
