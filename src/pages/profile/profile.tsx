import { useAppDispatch, useAppSelector } from "hooks/use-api"
import { IChangeForm } from "interface/common-interface"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useEffect, useId, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonMain } from "shared/buttons"
import { InputContentNotNess } from "shared/inputs"
import { useGetCurrentUserQuery, usePatchUserMutation, usePostImgUserMutation } from "store/services"
import { setUserData } from "store/slice"


export const Profile = () => {
    const dispatch = useAppDispatch();
    const [patchUser] = usePatchUserMutation();
    const [postAvatar] = usePostImgUserMutation();
    const form = useId();
    const [image, setImage] = useState<string>('');
    const [avatar, setAvatar] = useState('')
    console.log(image);

    const {data: currentUser, isLoading} = useGetCurrentUserQuery('');

    useEffect(() => {
        if(currentUser)
        dispatch(setUserData(currentUser))
    }, [currentUser]);

    const cashUser = useAppSelector((state) => state.user.userData)

    const {
        handleSubmit,
        control
    } = useForm<IChangeForm>({
        mode:'onChange',
        defaultValues: {
            name: cashUser?.name,
            surname: cashUser?.surname,
            city: cashUser?.city,
            phone: cashUser?.phone,
        }
    });

    const handleChange: SubmitHandler<IChangeForm> = (data) => {
        patchUser(data).then((res) => console.log(res));
    };

    const uploadContent = (event) => {
        event.preventDefault();
        event.target.files[0] && setImage(event.target.files[0]);
    }

    const sendContent = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', image);

        postAvatar(formData).then(res => {
            // dispatch(personalInfo(res.data))
            console.log(res);
            setAvatar(`http://localhost:8090/${res.data.avatar}`)
            console.log(res);
        }).catch (error => {
            console.log(error);
        })

        // axios.post('http://localhost:8090/user/avatar', formData, {
        //     headers: {
        //         'Content-type': 'multipart/form-data',
        //         'authorization': `Bearer ${token.userToken}`
        //     }
        // }).then(res => {
        //     dispatch(personalInfo(res.data))
        //     setAvatar(`http://localhost:8090/${res.data.avatar}`)
        //     console.log(res);
        // }).catch (error => {
        //     console.log(error);
        // })
    }

    return (
        <ContainerContent>
        <div className="w-1440 mx-10">
           <BackToMainPage />
           {isLoading
           ? <div>Loading...</div>
            :
            <div>
           <h2 className="mt-16 text-4xl">Здравствуйте, {currentUser?.email} !</h2>

            <div className="mt-10 mb-16">
                <h3 className="text-3xl">Настройки профиля</h3>
                <div className="flex justify-start items-start gap-10 mt-10">

                    <div className="flex flex-col items-center">
                        <div
                            className="bg-gray-200 w-44 h-44 rounded-full mb-4"
                        >
                            <img src={avatar} alt="profileImg"/>
                        </div>
                        <label
                            htmlFor='avatar'
                            onClick={(e) => sendContent(e)}
                            className="text-lg text-sky-500 hover:text-sky-800 hover:cursor-pointer">
                            Заменить
                        </label>
                        <input
                            onChange={(e) => uploadContent(e)}
                            className="hidden"
                            type="file"
                            id='avatar'
                        />
                    </div>

                    <form 
                        id={form}
                        onSubmit={handleSubmit(handleChange)}
                        className="w-614 grid grid-cols-2 gap-4"
                        >
                        <div className="col-span-2 flex gap-4">
                            <div>
                                <label className="grey-add-text">Имя</label>
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
           }

        </div>
     </ContainerContent>
    )
}