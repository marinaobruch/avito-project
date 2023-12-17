import { CardItem } from "components/card-item"
import { IChangeForm } from "interface/common-interface"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonMain } from "shared/buttons"
import { InputContent } from "shared/inputs/input-content"

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
        <div className="w-1440 mx-10">
           <BackToMainPage />

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
                                <label className="grey-add-text0">Имя</label>
                                <InputContent
                                    control={control}
                                    name="name"
                                    placeholder="Имя"
                                    type="text"
                                    width='300px'
                                />
                            </div>
                            <div>
                                <label className="grey-add-text">Фамилия</label>
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
                            <label className="grey-add-text">Город</label>
                            <InputContent
                                control={control}
                                name="city"
                                placeholder="Город"
                                type="text" 
                                width='300px'
                                />
                        </div>

                        <div className="col-span-2">
                            <label className="grey-add-text">Номер</label>
                            <InputContent
                                control={control}
                                name="number"
                                placeholder="Номер"
                                type="number" 
                                width='614px'
                                />
                        </div>
                        
                        <ButtonMain
                            type="submit"
                            text="Сохранить"
                            width="154px"
                        />
                    </form>
                </div>            
            </div>

            <h3 className="text-3xl">Мои товары</h3>
            <div className="grid grid-cols-8 gap-6 mt-5">
               <CardItem />
               <CardItem />
               <CardItem />
               <CardItem />
            </div>
        </div>
     </ContainerContent>
    )
}