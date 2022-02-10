import { useState, useEffect } from 'react'
import * as yup from 'yup'

const FormControlled = () => {
  const ufs = ['BA',
    'MG',
    'SP']

  const schema = yup.object().shape({
    name: yup.string().required('O campo nome é obrigatório'),
    email: yup
      .string()
      .required('O campo e-mail é obrigatório')
      .email('Preencha um e-mail válido')
  })
  const [form, setFormValues] = useState({
    name: '',
    email: '',
    uf: '',
    subscribe: false
  })
  const [hasError, setHasError] = useState(false)
  const [errors, setErrors] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [sending, setSending] = useState(false)
  useEffect(() => {
    const loadData = async () => {
      const data = await fetch('/api/users/3')
      const json = await data.json()

      setFormValues({
        name: json.name,
        email: json.email,
        uf: json.uf,
        subscribe: json.subscribe
      })
      setLoaded(true)
    }
    loadData()
  }, [])
  useEffect(() => {
    const validation = async () => {
      const hasError = await schema.isValid(form)
      setHasError(hasError)
      try {
        await schema.validate(form, { abortEarly: false })
        setErrors({})
      } catch (err) {
        const errors = err.inner.reduce(
          (prev, curr) => ({ ...prev, [curr.path]: curr.message }),
          {}
        )
        setErrors(errors)
      }
    }
    validation()
  }, [form])

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

  const submit = async () => {
    setSending(true)
    const data = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const json = await data.json()
    setSending(false)
  }

  return (
    <>
      <h1>Controlled loaded: {JSON.stringify(loaded)}</h1>
      {loaded && (
        <>
          Name:
          <input type='text' value={form.name} name='name' onChange={onChange} /><br />
          {errors.name && <p>{errors.name}</p>}
          E-mail:
          <input type='email' value={form.email} name='email' onChange={onChange} /><br />
          {errors.email && <p>{errors.email}</p>}
          Desejo receber novidades por e-mail
          <input type='checkbox' checked={form.subscribe} name='subscribe' onChange={onChange} /><br />
          <select name='uf' value={form.uf} onChange={onChange}>
            <option>Selecione o UF</option>
            {ufs.map((uf) => (
              <option value={uf} key={uf}>
                {uf}
              </option>
            ))}
          </select>
          {form.subscribe && <p>Obrigado por permitir que enviemos e-mails para você</p>}
          <button type='button' onClick={getValue}>
            Get value!
          </button>
          <button type='button' onClick={() => setShow(curr => !curr)}>
            Hide input!
          </button><br />
          <button type='button' onClick={submit} disabled={sending}>
            Enviar formulário
          </button>
          <pre>{JSON.stringify(form, null, 2)}</pre>
          {form === 'PJ' && <p>Informe os dados da PJ</p>}
        </>)}
    </>
  )
}

export default FormControlled