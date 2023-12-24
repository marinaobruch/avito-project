import { useAppSelector } from "hooks/use-api"
import { IChangeForm } from "interface/common-interface"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonMain } from "shared/buttons"
import { InputContentNotNess } from "shared/inputs"
import { useGetAllUsersQuery, usePatchUserMutation } from "store/services"


export const Profile = () => {
    const cashUser = useAppSelector((state) => state.user.email);
    const {data: allUsers} = useGetAllUsersQuery('');
    const currentUser = allUsers?.find((user) => user.email === cashUser)

    const [patchUser] = usePatchUserMutation();

    const {
        handleSubmit,
        control
    } = useForm<IChangeForm>({
        mode:'onChange',
        defaultValues: {
            name: currentUser?.name ? currentUser?.name : '',
            surname: currentUser?.surname ? currentUser?.surname : '',
            city: currentUser?.city ? currentUser?.city : '',
            phone: currentUser?.phone ? currentUser?.phone : '',
        }
    });

    const form = useId();

    const handleChange: SubmitHandler<IChangeForm> = (data) => {
        patchUser(data).then((res) => console.log(res));
    }

    return (
        <ContainerContent>
        <div className="w-1440 mx-10">
           <BackToMainPage />
           <h2 className="mt-16 text-4xl">Здравствуйте, {currentUser?.email}</h2>

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
                                <InputContentNotNess
                                    control={control}
                                    name="name"
                                    placeholder="Имя"
                                    type="text"
                                    width='300px'
                                />
                            </div>
                            <div>
                                <label className="grey-add-text">Фамилия</label>
                                <InputContentNotNess
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
                            <InputContentNotNess
                                control={control}
                                name="city"
                                placeholder="Город"
                                type="text" 
                                width='300px'
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="grey-add-text">Номер</label>
                            <InputContentNotNess
                                control={control}
                                name="phone"
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
            </div>
        </div>
     </ContainerContent>
    )
}