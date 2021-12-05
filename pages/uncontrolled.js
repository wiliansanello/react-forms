import { useRef, useState } from 'react'

const FormUncontrolled = () => {
  const inputRef = useRef()
  const [show, setShow] = useState(true)
  const getValue = () => {
    console.log(inputRef?.current?.value)
  }

  return (
    <>
      <h1>Uncontrolled</h1>
      {show && <input type='text' ref={inputRef} />}
      <button type='button' onClick={getValue}>
        Get value!
      </button>
      <button type='button' onClick={() => setShow(curr => !curr)}>
        Hide input!
      </button>
    </>
  )
}
export default FormUncontrolled