import { CardItem } from "components/card-item"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useState } from "react"
import { ButtonMain } from "shared/buttons"

export const ProfileSeller = () => {
    const [hideNumber, setHideNumber] = useState<boolean>(false);

    const phoneNumberHide = '8 905 ХХХ ХХ ХХ'
    const phoneNumber = '8 905 996 54 14'

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
                            <img/>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="text-xl">Марина Обруч</div>
                        <div className="grey-add-text">Екатеринбург</div>
                        <div className="grey-add-text">Продает товары с августа 2021</div>
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
            <div className="grid grid-cols-8 gap-6 mt-5">
               <CardItem />
            </div>
        </div>
     </ContainerContent>
    )
}