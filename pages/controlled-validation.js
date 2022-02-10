import { useState } from 'react'

const FormControlled = () => {
  const ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MG', 'MS', 'MT', 'PA']
  const [form, setFormValues] = useState({
    name: '',
    email: '',
    uf: '',
    subscribe: false
  })
  const getValue = () => {
    console.log(form)
  }

  const onChange = (event) => {
    const formField = event.target.name
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setFormValues(curr => {
      return {
        ...curr,
        [formField]: value
      }
    })
  }

  const errors = {
    name: false,
    email: false
  }
  if (form.name === '') {
    errors.name = true
  }
  if (form.email === '' || form.email.indexOf('@') < 0) {
    errors.email = true
  }
  const hasError = Object.keys(errors).reduce(
    (prev, curr) => prev || errors[curr],
    false
  )
  return (
    <>
      <h1>Controlled {JSON.stringify(hasError)}</h1>
      Name:
      <input type='text' value={form.name} name='name' onChange={onChange} /><br />
      {errors.name && <p>Por favor, informe o nome.</p>}
      E-mail:
      <input type='email' value={form.email} name='email' onChange={onChange} /><br />
      {errors.email && <p>Por favor, informe o e-mail</p>}
      Desejo receber novidades por e-mail
      <input type='checkbox' value={form.subscribe} name='subscribe' onChange={onChange} /><br />
      <select name='uf' value={form.uf} onChange={onChange}>
        <option>Selecione o UF</option>
        {ufs.map((uf) => (
          <option value={uf} key={uf}>
            {uf}
          </option>
        ))}
      </select>
      {form.subscribe && <p>Obrigado por permitir que enviemos e-mails para você</p>}
      <button type='button' onClick={getValue} disabled={hasError}>
        Get value!
      </button>
      <button type='button' onClick={() => setShow(curr => !curr)}>
        Hide input!
      </button>
      <pre>{JSON.stringify(form, null, 2)}</pre>
      {form === 'PJ' && <p>Informe os dados da PJ</p>}
    </>
  )
}

export default FormControlled