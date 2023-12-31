import { CardItem } from "components/card-item"
import { useAppSelector } from "hooks/use-api"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useState } from "react"
import { ButtonMain } from "shared/buttons"
import { CreateHideNumber } from "utils/createHideNumber"
import { createSellerBy } from "utils/createSellerBy"
import { NoPhotoBig } from "shared/logos";
import { useGetAdByUserIdQuery } from "store/index"


export const ProfileSeller = () => {

    const userData = useAppSelector((state) => state.profile.choisenUser);
    const {data: getAdsByUserId} = useGetAdByUserIdQuery(userData.id);

    const [hideNumber, setHideNumber] = useState<boolean>(false);

    const phoneNumber: string | undefined = userData?.phone;
    const phoneNumberHide = CreateHideNumber(phoneNumber);
    const periopOfSales: string = createSellerBy(userData.sells_from);

    const handleShowNumber = () => setHideNumber((prev) => !prev);


    return (
        <ContainerContent>
        <div className="w-1440 mx-10">
        <BackToMainPage />

           <h2 className="mt-16 text-4xl">Профиль продавца</h2>

            <div className="mt-10 mb-16">
                <div className="flex justify-start items-start gap-10 mt-10">

                    <div className="flex flex-col items-center">
                        <div className="bg-gray-200 w-44 h-44 rounded-full mb-4">
                            {userData.avatar
                            ?<img
                                className="w-44 h-44 object-cover"
                                src={`http://localhost:8090/${userData.avatar}`}
                            />
                            : <NoPhotoBig />
                        }
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="text-xl">{userData.name}</div>
                        <div className="grey-add-text">{userData.city}</div>
                        <div className="grey-add-text">Продает товары с {periopOfSales}</div>
                        <ButtonMain
                            type="button"
                            onClick={handleShowNumber}
                            text= {hideNumber ? phoneNumber : phoneNumberHide}
                            width="214px"
                        />
                    </div>
                </div>            
            </div>

            <h3 className="text-3xl">Товары продавца</h3>
            <CardItem allAds={getAdsByUserId} />
        </div>
     </ContainerContent>
    )
}