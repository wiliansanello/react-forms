import { useState, useEffect } from 'react'
import * as yup from 'yup'

const FormControlled = () => {
  const ufs = ['AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO']

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

  return (
    <>
      <h1>Controlled</h1>
      Name:
      <input type='text' value={form.name} name='name' onChange={onChange} /><br />
      {errors.name && <p>{errors.name}</p>}
      E-mail:
      <input type='email' value={form.email} name='email' onChange={onChange} /><br />
      {errors.email && <p>{errors.email}</p>}
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
      <button type='button' onClick={getValue}>
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