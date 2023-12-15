import { ProductCard } from "components/product-card"
import { IChangeForm } from "interface/login-interface"
import { ContainerContent } from "layouts/container"
import { useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { ButtonMain } from "shared/buttons"
import { InputContent } from "shared/inputs/input-content"
import { Logo } from "shared/logos"

export const Profile = () => {
    const {
        handleSubmit,
        control,
        reset
    } = useForm<IChangeForm>({
        mode:'onChange',
        defaultValues: {
            name: 'Marina',
            surname: 'Obruch',
            city: 'Ekaterinburg',
            number: '89999993122',
        }
    });

    const form = useId()

    const handleChange: SubmitHandler<IChangeForm> = (data) => {
        console.log(data);
        reset()
    }

    return (
        <ContainerContent>
        <div className="w-1440">
           <div className="grid grid-cols-8 items-center">
              <div className="col-span-1">
                 <Logo />
              </div>
              <div className="col-span-7">
                <NavLink to={'/main'}>
                    <ButtonMain text="Вернуться на главную" width="240px" />
                </NavLink>
              </div>
           </div>

           <h2 className="mt-16 text-4xl">Здравствуйте, Марина!</h2>

            <div className="mt-10 mb-16">
                <h3 className="text-3xl">Настройки профиля</h3>
                <div className="flex justify-start items-start gap-10 mt-10">

                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-44 h-44 rounded-full mb-4">
                            <img/>
                        </div>
                        <p className="text-lg text-sky-500 hover:text-sky-800 hover:cursor-pointer">Заменить</p>
                    </div>

                    <form 
                        id={form}
                        onSubmit={handleSubmit(handleChange)}
                        className="w-614 grid grid-cols-2 gap-4"
                        >
                        <div className="col-span-2 flex gap-4">
                            <div>
                                <label className="text-base text-gray-500">Имя</label>
                                <InputContent
                                    control={control}
                                    name="name"
                                    placeholder="Имя"
                                    type="text"
                                    width='300px'
                                />
                            </div>
                            <div>
                                <label className="text-base text-gray-500">Фамилия</label>
                                <InputContent
                                    control={control}
                                    name="surname"
                                    placeholder="Фамилия"
                                    type="text" 
                                    width='300px'
                                    />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="text-base text-gray-500">Город</label>
                            <InputContent
                                control={control}
                                name="city"
                                placeholder="Город"
                                type="text" 
                                width='300px'
                                />
                        </div>

                        <div className="col-span-2">
                            <label className="text-base text-gray-500">Номер</label>
                            <InputContent
                                control={control}
                                name="number"
                                placeholder="Номер"
                                type="number" 
                                width='614px'
                                />
                        </div>
                        
                        <ButtonMain text="Сохранить" width="154px" />
                    </form>
                </div>            
            </div>

            <h3 className="text-3xl">Мои товары</h3>
            <div className="grid grid-cols-8 gap-6 mt-5">
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
            </div>
        </div>
     </ContainerContent>
    )
}