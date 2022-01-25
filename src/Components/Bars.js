const Bars = ({ arr }) => {
  return (
    <div className='data-container'>
      <ul id='linesList'>
        {arr.map((x, index) => (
          <li key={index}>
            <div
              className='bar'
              style={{ height: `${x.height * 10}px`, backgroundColor: x.color }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bars
