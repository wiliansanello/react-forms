import { Formik, Form, Field } from 'formik'

const FormFormik = () => {
  const ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MG', 'MS', 'MT', 'PA']

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
        onSubmit={async (values) => (
          console.log(values)
        )}
      >
        {({ values }) => (
          <Form>
            <label>
              Name:
              <Field type='text' name='name' />
            </label>
            <label>
              E-mail:
              <Field type='text' name='email' />
            </label>
            <label>
              UF:
              <Field component='select' name='uf'>
                {ufs.map(uf => <option value={uf} key={uf}>{uf}</option>)}
              </Field>
            </label>
            <Field type='checkbox' name='subscribe' />
            <button type='submit'>Enviar form</button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default FormFormik