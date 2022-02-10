import { Formik, Form, Field } from 'formik'
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

  return (
    <>
      <h1>Formik Render Prop</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          uf: '',
          subscribe: false
        }}
        onSubmit={async (values) => {
          const data = await fetch('/api/users', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          const json = await data.json()
        }}
        validationSchema={schema}
      >
        {({ values, errors, touched, setFieldValue }) => {
          useEffect(() => {
            const loadData = async () => {
              const data = await fetch('/api/users/1')
              const json = await data.json()
              setFieldValue('name', json.name)
              setFieldValue('email', json.email)
              setFieldValue('uf', json.uf)
              setFieldValue('subscribe', json.subscribe)
            }
            loadData()
            console.log('form ready')
          }, [])
          return (
            <Form>
              <label>
                Name:
                <Field type='text' name='name' />
                {errors.name && touched.name ? errors.name : ''}
              </label>
              <br />
              <label>
                E-mail:
                <Field type='text' name='email' />
                {errors.email && touched.email ? errors.email : ''}
              </label>
              <br />
              <label>
                UF:
                <Field component='select' name='uf'>
                  {ufs.map(uf => <option value={uf} key={uf}>{uf}</option>)}
                </Field>
              </label>
              <Field type='checkbox' name='subscribe' />
              <button type='submit'>Enviar form</button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
export default FormFormik