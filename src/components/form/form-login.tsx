import { useId, useState } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { setAccessToken, setUser, setUserData } from 'store/slice';
import { ButtonLogIn, ButtonReg } from 'shared/buttons';
import { InputLogin } from 'shared/inputs';
import { LogoSkyPro } from 'shared/logos';
import { useAppDispatch } from 'hooks/use-api';
import { useGetCurrentUserQuery, usePostLoginMutation } from 'store/services';
import { IUserLogin } from 'interface/api-interface';

export const FormLogin = () => {
    const [postLogin] = usePostLoginMutation();
    const {data: currentUser} = useGetCurrentUserQuery('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const {
        handleSubmit,
        control,
    } = useForm<IUserLogin>({
        mode:'onChange',
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const form = useId();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit:SubmitHandler<IUserLogin> = async (data) => {
        await postLogin(data)
        .unwrap()
        .then((fulfilled) => {
            dispatch(setAccessToken(fulfilled.access_token));
            localStorage.setItem('refresh_token', fulfilled.refresh_token);
            if(currentUser) dispatch(setUserData(currentUser));
            navigate('/profile')
        })
        .catch((rejected) => {
            console.log(rejected);
            if ( rejected.status === 401 && rejected.data.detail === 'Incorrect password' )
                {
                    setErrorMessage('Неправильный пароль');
                    console.log(401);
                }
            if ( rejected.status === 401 && rejected.data.detail === 'Incorrect email' )
                {
                    setErrorMessage('Такого пользователя не существует')
                    console.log(401);
                }
            if (rejected.status === 422) setErrorMessage('Некорректный электронный адрес')
            return
          })

        dispatch(setUser(data));
    }

    return (
        <div className='w-full h-full fixed left-0 top-0 flex justify-center items-center bg-sky-500'>
            <div className='w-96 h-480 bg-white flex flex-col justify-center items-center rounded-lg gap-12'>
            <LogoSkyPro />
                <form
                    id={form}
                    className='flex flex-col justify-center items-center gap-10' 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='flex flex-col gap-8'>
                        <InputLogin
                            control={ control }
                            name="email"
                            placeholder="email"
                            type="email"
                        />
                        <InputLogin 
                            control={ control }
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                    </div>

                    <div className='flex flex-col gap-5'>
                            <ButtonLogIn
                                type='submit'
                                text='Войти'
                            />
                        <NavLink to={'/register'}>
                            <ButtonReg
                                type='button'
                                text='Зарегистрироваться'
                            />
                        </NavLink>
                    </div>
                </form>
                <div className='text-xl text-red-500'>{errorMessage}</div>
            </div>
        </div>
    )
}