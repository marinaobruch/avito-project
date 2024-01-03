import { useId, useState } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken, setUser, setUserData } from 'store/slice';
import { ButtonLogIn, ButtonReg } from 'shared/buttons';
import { InputLogin } from 'shared/inputs';
import { LogoSkyPro } from 'shared/logos';
import { useAppDispatch } from 'hooks/use-api';
import { useGetCurrentUserQuery, usePostLoginMutation } from 'store/services';
import { IUserLogin } from 'interface/api-interface';
import { LayoutMobile, MobileMenu } from 'layouts/layout';

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
            dispatch(setRefreshToken(fulfilled.refresh_token));
            
            localStorage.setItem('access_token', fulfilled.access_token);
            localStorage.setItem('refresh_token', fulfilled.refresh_token);

            if(currentUser) dispatch(setUserData(currentUser));
            navigate('/profile')
        })
        .catch((rejected) => {
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

        dispatch(setUser(data.email));

        
    }

    return (
        <div className='flex-col'>
            <LayoutMobile />
            <div
                className='w-full h-full left-0 top-0 flex justify-center items-center bg-sky-500 
                sm-min:fixed sm:bg-white'
            >
                <div
                    className='w-96 h-480 bg-white flex flex-col justify-center items-center rounded-lg gap-12 
                    sm:mt-28 sm:w-full'
                >
                    <LogoSkyPro />
                        <form
                            id={form}
                            className='sm:w-full flex flex-col justify-center items-center gap-10' 
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='sm:w-full flex flex-col items-center gap-8'>
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

                            <div className='flex flex-col items-center gap-5 w-full'>
                            <div className='w-full sm:px-10'>
                                <ButtonLogIn
                                    type='submit'
                                    text='Войти'
                                />
                            </div>
                                <NavLink to={'/register'} className='w-full sm:px-10'>
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
            <MobileMenu />
        </div>
    )
}
