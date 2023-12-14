import { ILoginRequest } from 'interface/login-interface';
import {SubmitHandler, useForm} from 'react-hook-form'
import { ButtonLogIn, ButtonReg } from 'shared/buttons';
import { LogoSkyPro } from 'shared/logos';

export const FormLogin = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ILoginRequest>({
        mode:'onChange'
    });

    const onSubmit:SubmitHandler<ILoginRequest> = (data) => {
        alert(`Your email is ${data.email}`)
        reset()
    }

    return (
    <div className='w-full h-full fixed left-0 top-0 flex justify-center items-center bg-blue-500'>
        <div className='w-96 h-450 bg-white flex flex-col justify-center items-center rounded-lg'>
        <LogoSkyPro />
            <form className='flex flex-col justify-center items-center gap-14' onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register('email', {
                        required: 'Email is require to field!'
                      })}
                    type='email'
                    placeholder='Email'
                />
                {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                <input 
                    {...register('password', {
                        required: 'Password is require to field!'
                    })}
                    type='password'
                    placeholder='Password'
                />
                {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                <ButtonLogIn text='Войти'/>
                <ButtonReg text='Зарегистрироваться'/>
            </form>
         </div>
    </div>
    )
}