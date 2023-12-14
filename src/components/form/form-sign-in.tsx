import {SubmitHandler, useForm} from 'react-hook-form'
import { ILoginRequest } from 'interface/login-interface';
import { LogoSkyPro } from 'shared/logos';

export const FormSingIn = () => {
    const {register,
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
        <div className='w-96 h-96 bg-white flex flex-col justify-center items-center rounded-lg'>
        <LogoSkyPro />
            <form className='flex flex-col justify-center items-center gap-16' onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register('email', {
                        required: 'Email is require to field!'
                      })}
                    type='email'
                    placeholder='Email'
                />
                <input 
                    {...register('email', {
                        required: 'Email is require to field!'
                      })}
                    type='email'
                    placeholder='Name'
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
                <button>Send</button>
            </form>
         </div>
    </div>
    )
}