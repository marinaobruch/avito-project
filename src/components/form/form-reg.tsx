import { IRegRequest } from 'interface/login-interface';
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ButtonLogIn } from 'shared/buttons';
import { InputLogin } from 'shared/inputs';
import { LogoSkyPro } from 'shared/logos';

export const FormReg = () => {
    const navigate = useNavigate()
    const {
        handleSubmit,
        control,
        register,
    } = useForm<IRegRequest>({
        mode:'onChange',
    });

    const onSubmit:SubmitHandler<IRegRequest> = (data) => {
        console.log(`Your email is ${data.email} and your password is ${data.password}`);
    }

    return (
    <div className='w-full h-full fixed left-0 top-0 flex justify-center items-center bg-sky-500'>
        <div className='w-96 h-650 bg-white flex flex-col justify-center items-center rounded-lg gap-12'>
            <div onClick={() => navigate('/login')}>
            <LogoSkyPro />
            </div>
        
            <form
                className='flex flex-col justify-center items-center gap-14' 
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col gap-8'>
                    <InputLogin
                        {...register('email', {
                            required: 'Email is require to field!'
                        })}
                        control={ control }
                        name="email"
                        placeholder="email"
                        type="text"
                    />
                    <InputLogin 
                        {...register('password', {
                            required: 'Password is require to field!'
                        })}
                        control={ control }
                        name="password"
                        placeholder="Пароль"
                        type="password"
                    />
                     <InputLogin 
                        {...register('passwordRepeat', {
                            required: 'Password is require to field!'
                        })}
                        control={ control }
                        name="passwordRepeat"
                        placeholder="Повторите пароль"
                        type="password"
                    />
                    <InputLogin
                        control={ control }
                        name="name"
                        placeholder="Имя (необязательно)"
                        type="text"
                    />
                    <InputLogin
                        control={ control }
                        name="surname"
                        placeholder="Фамилия (необязательно)"
                        type="text"
                    />
                    <InputLogin
                        control={ control }
                        name="city"
                        placeholder="Город (необязательно)"
                        type="text"
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <ButtonLogIn type='submit' text='Зарегистрироваться'/>
                </div>
            </form>
         </div>
    </div>
    )
}