import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const ufs = ['SP', 'MG', 'BA']

const schema = yup.object().shape({
  name: yup.string().required('O campo nome é obrigatório'),
  email: yup
    .string()
    .required('O campo e-mail é obrigatório')
    .email('Preencha um e-mail válido')
})

const RHF = () => {
  const { register, watch, handleSubmit, setValue, formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    const loadData = async () => {
      const data = await fetch('/api/users/1')
      const json = await data.json()

      setValue('name', json.name)
      setValue('email', json.email)
      setValue('uf', json.uf)
      setValue('subscribe', json.subscribe)
    }
    loadData()
  }, [])
  const onSubmit = async (values) => {
    const data = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application-json'
      },
      body: JSON.stringify(values)
    })
  }
  console.log(watch('name'))
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>React-hook-form</h1>
        <label>
          <input type='text' {...register('name')} />
          {errors?.name && <p>{errors.name.message}</p>}
        </label>
        <label>
          <input type='text' {...register('email')} />
          {errors?.email && <p>{errors.email.message}</p>}
        </label>
        <label>
          <input type='checkbox' {...register('subscribe')} />
        </label>
        <label>
          <select name='uf' {...register('uf')}>
            <option>Selecione a UF</option>
            {ufs.map((uf) => (
              <option value={uf} key={uf}>
                {uf}
              </option>
            ))}
          </select>
        </label>
        <button type='submit'>Enviar</button>
        {watch('uf')}
        <pre>{console.log(errors)}</pre>
      </form>
    </>
  )
}

export default RHF