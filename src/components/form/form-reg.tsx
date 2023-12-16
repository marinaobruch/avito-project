import { IRegRequest } from 'interface/common-interface';
import { useId } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ButtonLogIn } from 'shared/buttons';
import { InputLogin } from 'shared/inputs';
import { InputNotNessesary } from 'shared/inputs/input-not-ness';
import { LogoSkyPro } from 'shared/logos';

export const FormReg = () => {
    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        reset
    } = useForm<IRegRequest>({
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

    const onSubmit:SubmitHandler<IRegRequest> = (data) => {
        console.log(`Your email is ${data.email} and your password is ${data.password}`);
        reset()
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
                        type="text"
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