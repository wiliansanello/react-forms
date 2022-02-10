import { Formik, Form, Field, useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect } from 'react'

const FormFormik = () => {
  const ufs = ['MG', 'RJ', 'SP']

  const schema = yup.object().shape({
    name: yup.string().required('O campo nome é obrigatório'),
    email: yup
      .string()
      .required('O campo e-mail é obrigatório!')
      .email('Preencha um e-mail válido')
  })

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      uf: '',
      subscribe: false
    },
    onSubmit: async (values) => {
      const data = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const json = await data.json()
    },
    validationSchema: schema
  })
  useEffect(() => {
    const loadData = async () => {
      const data = await fetch('/api/users/1')
      const json = await data.json()
      form.setFieldValue('name', json.name)
      form.setFieldValue('email', json.email)
      form.setFieldValue('uf', json.uf)
      form.setFieldValue('subscribe', json.subscribe)
    }
    loadData()
    console.log('form ready')
  }, [])

  return (
    <>
      <h1>Formik Hook</h1>
      <form onSubmit={form.handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.name && form.touched.name ? form.errors.name : ''}
        </label>
        <br />
        <label>
          E-mail:
          <input
            type='text'
            name='email'
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.email && form.touched.email ? form.errors.email : ''}
        </label>
        <br />
        <label>
          UF:
          <select
            name='uf'
            value={form.values.uf}
            onchange={form.handleChange}
            onBlur={form.handleBlur}>
            {ufs.map(uf => <option value={uf} key={uf}>{uf}</option>)}
          </select>
        </label>
        <input
          type='checkbox'
          name='subscribe'
          checked={form.values.subscribe}
          onChange={form.handleChange}
        />
        <button type='submit'>Enviar form</button>
        <pre>{JSON.stringify(form.values, null, 2)}</pre>
        <pre>{JSON.stringify(form.touched, null, 2)}</pre>
      </form>
    </>
  )
}
export default FormFormik