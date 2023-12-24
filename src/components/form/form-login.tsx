import { useId } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import { setUser } from 'store/slice';
import { ButtonLogIn, ButtonReg } from 'shared/buttons';
import { InputLogin } from 'shared/inputs';
import { LogoSkyPro } from 'shared/logos';
import { IUser } from 'interface/api-interface';
import { useAppDispatch } from 'hooks/use-api';
import { usePostLoginMutation } from 'store/services';

export const FormLogin = () => {
    const [postLogin] = usePostLoginMutation();

    const {
        handleSubmit,
        control,
        reset
    } = useForm<IUser>({
        mode:'onChange',
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const form = useId();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit:SubmitHandler<IUser> = async (data) => {
        await postLogin(data).then((res) => {
            console.log(res);
            navigate('/main')
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
                        {/* <NavLink to={'/profile'}> */}
                            <ButtonLogIn
                                type='submit'
                                text='Войти'
                            />
                        {/* </NavLink> */}
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