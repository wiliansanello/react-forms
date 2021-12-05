import { useState } from 'react'

const FormControlled = () => {
  const [show, setShow] = useState(true)
  const [value, setValue] = useState('')
  const getValue = () => {
    console.log(value)
  }

  const onChange = (event) => {
    console.log(event)
    setValue(event.target.value)
  }

  return (
    <>
      <h1>Controlled</h1>
      {show && <input type='text' value={value} onChange={onChange} />}<br />
      <button type='button' onClick={getValue}>
        Get value!
      </button>
      <button type='button' onClick={() => setShow(curr => !curr)}>
        Hide input!
      </button>
      {value}
      {value === 'PJ' && <p>Informe os dados da PJ</p>}
    </>
  )
}

export default FormControlled