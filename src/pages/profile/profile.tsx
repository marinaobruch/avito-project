import { useAppDispatch, useAppSelector } from "hooks/use-api"
import { IChangeForm } from "interface/common-interface"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useEffect, useId } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ButtonMainDisabled } from "shared/buttons"
import { InputContentNotNess } from "shared/inputs"
import { useGetCurrentUserQuery, useGetUserAdsQuery, usePatchUserMutation } from "store/services"
import { setUserData } from "store/slice"
import { UserAvatar } from "."
import { CardItem } from "components/card-item"

import {Puff} from 'react-loader-spinner';



export const Profile = () => {
    const dispatch = useAppDispatch();
    const [patchUser] = usePatchUserMutation();
    const {data: getUser} = useGetCurrentUserQuery('');
    const {data: getUserAds, isLoading: isLoadingAdsUser} = useGetUserAdsQuery('');
    const {data: currentUser, isLoading: isLoadingcurrentUser} = useGetCurrentUserQuery('');
    const form = useId();

    useEffect(() => {
        if(currentUser)
        dispatch(setUserData(currentUser));
    }, [currentUser]);

    const cashUser = useAppSelector((state) => state.user.userData);

    const {
        handleSubmit,
        control,
        watch
    } = useForm<IChangeForm>({
        mode:'onChange',
        defaultValues: {
            name: cashUser?.name,
            surname: cashUser?.surname,
            city: cashUser?.city,
            phone: cashUser?.phone,
        },
    });

    const name = watch('name')
    const surname = watch('surname')
    const city = watch('city')
    const phone = watch('phone')

    const isValid = name !==cashUser?.name ||
                    surname !==cashUser?.surname ||
                    city !==cashUser?.city ||
                    phone !== cashUser?.phone

    const handleChange: SubmitHandler<IChangeForm> = (data) => {
        patchUser(data).then((res) => {
            dispatch(setUserData(res.data));
            console.log(res);
        }
    )};

    return (
        <ContainerContent>
        <div className="w-1440 mx-10">
           <BackToMainPage />
           {isLoadingcurrentUser
           ? <div>
                <Puff
                visible={true}
                height="80"
                width="80"
                color="#0ea5e9"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
           </div>
            :
            <div>
           <h2 className="mt-16 text-4xl">Здравствуйте, {currentUser?.email} !</h2>

            <div className="mt-10 mb-16">
                <h3 className="text-3xl">Настройки профиля</h3>
                <div className="flex justify-start items-start gap-10 mt-10">

                    <UserAvatar getUser={getUser}/>

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
                        
                        <ButtonMainDisabled
                            type="submit"
                            text="Сохранить"
                            width="154px"
                            disabled={isValid}
                        />
                    </form>
                </div>            
            </div>

            <h3 className="text-3xl">Мои товары</h3>
            <div className="grid grid-cols-8 gap-6 mt-5">
            </div>
            <CardItem allAds={getUserAds} isLoading={isLoadingAdsUser}/>
           </div>
           }

        </div>
     </ContainerContent>
    )
}