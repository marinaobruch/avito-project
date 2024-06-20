import { useAppDispatch } from 'hooks/use-api'
import { IUserReg } from 'interface/api-interface'
import { MainMobileLayout } from 'layouts/layout'
import { useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { ButtonLogIn } from 'shared/buttons'
import { InputLogin } from 'shared/inputs'
import { InputNotNessesary } from 'shared/inputs/input-log-not-ness'
import { LogoSkyPro } from 'shared/logos'
import { usePostLoginMutation, usePostRegMutation } from 'store/services'
import { setUser } from 'store/slice'

export const FormReg = () => {
  const [postReg] = usePostRegMutation()
  const [postLogin] = usePostLoginMutation()

  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { handleSubmit, control } = useForm<IUserReg>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: '',
      name: '',
      surname: '',
      city: '',
    },
  })

  const form = useId()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<IUserReg> = async (data) => {
    if (data.password !== data.passwordRepeat) {
      setError('Пароли не совпадают')
      return
    }
    await postReg(data)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled)
        dispatch(setUser(data.email))
      })
      .catch((rejected) => {
        if (rejected.status === 400) {
          setErrorMessage('Такой пользователь уже существует')
          return
        }
      })
    console.log(errorMessage)
    {
      errorMessage.length >= 0 &&
        (await postLogin(data)
          .unwrap()
          .then((fulfilled) => {
            localStorage.setItem('access_token', fulfilled.access_token)
            localStorage.setItem('refresh_token', fulfilled.refresh_token)

            navigate('/profile')
          }))
    }
  }

  return (
    <div className='flex-col'>
      <MainMobileLayout>
        <div
          className='w-full h-full left-0 top-0 flex justify-center items-center bg-sky-500
                    lg-min:fixed lg:bg-white'
        >
          <div
            className='w-96 bg-white flex flex-col justify-center items-center rounded-lg gap-12
                        lg:mt-28 lg:w-full'
          >
            <NavLink to={'/login'} className='lg-min:mt-10'>
              <LogoSkyPro />
            </NavLink>
            <form
              id={form}
              className='lg:w-full flex flex-col justify-center items-center gap-14'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='lg:w-full flex flex-col items-center gap-8'>
                <InputLogin
                  control={control}
                  name='email'
                  placeholder='email'
                  type='email'
                />
                <InputLogin
                  control={control}
                  name='password'
                  placeholder='Пароль'
                  type='password'
                />
                <InputLogin
                  control={control}
                  name='passwordRepeat'
                  placeholder='Повторите пароль'
                  type='password'
                />
                {error && <span className='text-xs text-red-600'>{error}</span>}
                <InputNotNessesary
                  control={control}
                  name='name'
                  placeholder='Имя (необязательно)'
                  type='text'
                />
                <InputNotNessesary
                  control={control}
                  name='surname'
                  placeholder='Фамилия (необязательно)'
                  type='text'
                />
                <InputNotNessesary
                  control={control}
                  name='city'
                  placeholder='Город (необязательно)'
                  type='text'
                />
              </div>
              <div className='w-full px-10'>
                <ButtonLogIn type='submit' text='Зарегистрироваться' />
                <div className='text-xl text-red-500 lg:mb-24 lg-min:mb-5'>
                  {errorMessage}
                </div>
              </div>
            </form>
          </div>
        </div>
      </MainMobileLayout>
    </div>
  )
}
