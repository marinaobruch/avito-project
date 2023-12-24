import { useAppDispatch } from 'hooks/use-api';
import { IUserReg } from 'interface/api-interface';
import { useId, useState } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ButtonLogIn } from 'shared/buttons';
import { InputLogin } from 'shared/inputs';
import { InputNotNessesary } from 'shared/inputs/input-log-not-ness';
import { LogoSkyPro } from 'shared/logos';
import { usePostLoginMutation, usePostRegMutation } from 'store/services';
import { setAccessToken, setUser } from 'store/slice';

export const FormReg = () => {
    const [postReg] = usePostRegMutation();
    const [postLogin] = usePostLoginMutation();

    const navigate = useNavigate();
    const [error, setError] = useState<string>('')

    const {
        handleSubmit,
        control,
        reset
    } = useForm<IUserReg>({
        mode:'onChange',
        defaultValues: {
            email: '',
            password: '',
            passwordRepeat: '',
            name: '',
            surname: '',
            city: '',
        }
    });

    const form = useId()
    const dispatch = useAppDispatch();

    const onSubmit:SubmitHandler<IUserReg> = async (data) => {
        if(data.password !== data.passwordRepeat) {
            setError("Пароли не совпадают");
            return;
        }
        await postReg(data).then((res) => console.log(res));
        await postLogin(data).then((res) => {
            dispatch(setAccessToken(res.data.access_token));
            localStorage.setItem('refresh_token', res.data.refresh_token);
            navigate('/')
        })

        dispatch(setUser(data));
        reset();
    }

    return (
    <div className='w-full h-full fixed left-0 top-0 flex justify-center items-center bg-sky-500'>
        <div className='w-96 h-650 bg-white flex flex-col justify-center items-center rounded-lg gap-12'>
            <div className='cursor-pointer' onClick={() => navigate('/login')}>
            <LogoSkyPro />
            </div>
        
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
                        placeholder="Пароль"
                        type="password"
                    />
                     <InputLogin 
                        control={ control }
                        name="passwordRepeat"
                        placeholder="Повторите пароль"
                        type="password"
                    />
                    {error && <span className="text-xs text-red-600">{error}</span>}
                    <InputNotNessesary
                        control={ control }
                        name="name"
                        placeholder="Имя (необязательно)"
                        type="text"
                    />
                    <InputNotNessesary
                        control={ control }
                        name="surname"
                        placeholder="Фамилия (необязательно)"
                        type="text"
                    />
                    <InputNotNessesary
                        control={ control }
                        name="city"
                        placeholder="Город (необязательно)"
                        type="text"
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <ButtonLogIn
                        type='submit'
                        text='Зарегистрироваться'
                    />
                </div>
            </form>
         </div>
    </div>
    )
}