import { CardItem } from "components/card-item"
import { BackToMainPage, ContainerContent } from "layouts/container"
import { ButtonMain } from "shared/buttons"

export const ProfileSeller = () => {

    const phoneNumber = '8 905 ХХХ ХХ ХХ'

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
                        text= {phoneNumber}
                        width="214px"/>
                    </div>
                </div>            
            </div>

            <h3 className="text-3xl">Товары продавца</h3>
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