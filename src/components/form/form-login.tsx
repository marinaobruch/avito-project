import { useAppDispatch } from 'hooks/use-api'
import { IUserLogin } from 'interface/api-interface'
import { MainMobileLayout } from 'layouts/layout'
import { useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { ButtonLogIn, ButtonReg } from 'shared/buttons'
import { InputLogin } from 'shared/inputs'
import { LogoSkyPro } from 'shared/logos'
import { usePostLoginMutation } from 'store/services'
import { setUser } from 'store/slice'

export const FormLogin = () => {
  const [postLogin] = usePostLoginMutation()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { handleSubmit, control } = useForm<IUserLogin>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const form = useId()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<IUserLogin> = async (data) => {
    await postLogin(data)
      .unwrap()
      .then((fulfilled) => {
        localStorage.setItem('access_token', fulfilled.access_token)
        localStorage.setItem('refresh_token', fulfilled.refresh_token)

        navigate('/profile')
      })
      .catch((rejected) => {
        if (
          rejected.status === 401 &&
          rejected.data.detail === 'Incorrect password'
        ) {
          setErrorMessage('Неправильный пароль')
          console.log(401)
        }
        if (
          rejected.status === 401 &&
          rejected.data.detail === 'Incorrect email'
        ) {
          setErrorMessage('Такого пользователя не существует')
          console.log(401)
        }
        if (rejected.status === 422)
          setErrorMessage('Некорректный электронный адрес')
        return
      })

    dispatch(setUser(data.email))
  }

  return (
    <div className='flex-col'>
      <MainMobileLayout>
        <div
          className='w-full h-full left-0 top-0 flex justify-center items-center bg-sky-500 
                    lg-min:fixed lg:bg-white'
        >
          <div
            className='w-96 h-480 bg-white flex flex-col justify-center items-center rounded-lg gap-12 
                        lg:mt-28 lg:w-full'
          >
            <LogoSkyPro />
            <form
              id={form}
              className='lg:w-full flex flex-col justify-center items-center gap-10'
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
                  placeholder='password'
                  type='password'
                />
              </div>

              <div className='flex flex-col items-center gap-5 w-full'>
                <div className='w-full px-10'>
                  <ButtonLogIn type='submit' text='Войти' />
                </div>
                <NavLink to={'/register'} className='w-full px-10'>
                  <ButtonReg type='button' text='Зарегистрироваться' />
                </NavLink>
              </div>
            </form>
            <div className='text-xl text-red-500'>{errorMessage}</div>
          </div>
        </div>
      </MainMobileLayout>
    </div>
  )
}
