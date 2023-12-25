import { useId } from 'react';
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

    const {
        handleSubmit,
        control,
        reset
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
        await postLogin(data).then((res) => {
            dispatch(setAccessToken(res.data.access_token));
            localStorage.setItem('refresh_token', res.data.refresh_token);
            if(currentUser) dispatch(setUserData(currentUser));
            navigate('/');
        })

        dispatch(setUser(data));
        reset();
    }

    return (
        <div className='w-full h-full fixed left-0 top-0 flex justify-center items-center bg-sky-500'>
            <div className='w-96 h-450 bg-white flex flex-col justify-center items-center rounded-lg gap-12'>
            <LogoSkyPro />
                <form
                    id={form}
                    className='flex flex-col justify-center items-center gap-14' 
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
            </div>
        </div>
    )
}