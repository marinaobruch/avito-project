import { BackToMainPage, ContainerContent } from "layouts/container"
import { NavLink } from "react-router-dom"
import { ButtonMain } from "shared/buttons"

export const ProductCard = () => {

    const phoneNumber = '8 905 ХХХ ХХ ХХ'

    return (
        <ContainerContent>
        <div className="w-1440 mx-10">
           <BackToMainPage />

            <div className="mt-10 mb-16">
                <div className="flex justify-start items-start gap-10 mt-20">

                    <div className="flex flex-col items-center gap-8">
                        <div className="h-480 w-480 bg-gray-200">
                            <img src="#" alt="" />
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="h-20 w-20 bg-gray-200">
                                <img src="#" alt="" />
                            </div>
                            <div className="h-20 w-20 bg-gray-200">
                                <img src="#" alt="" />
                            </div>
                            <div className="h-20 w-20 bg-gray-200">
                                <img src="#" alt="" />
                            </div>
                            <div className="h-20 w-20 bg-gray-200">
                                <img src="#" alt="" />
                            </div>
                            <div className="h-20 w-20 bg-gray-200">
                                <img src="#" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="text-3xl pb-3 max-w-xl">Ракетка для большого тенниса Triumph Pro STС Б/У</div>
                        <div className="grey-add-text">Сегодня в 10:45</div>
                        <div className="grey-add-text">Санкт-Петербург</div>
                        <div className="text-base text-sky-500">23 отзыва</div>
                        <div className="text-3xl pt-9 pb-5">2 200 ₽</div>
                        <ButtonMain 
                            text= {phoneNumber}
                            width="214px"/>

                        <NavLink to={'/profile-seller'}>
                            <div className="pt-9 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200">
                                    <img src="" alt="" />
                                </div>
                                <div>
                                    <div className="text-xl text-sky-500">Марина</div>
                                    <div className="grey-add-text">Продает товары с августа 2021</div>
                                </div>
                            </div>
                        </NavLink>

                    </div>
                </div>      

                   <div className="mt-16">
                    <h3 className="text-4xl mb-8">Описание товара</h3>
                    <div className="text-base max-w-792">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae eveniet saepe dolorum eligendi! Sed molestiae deleniti porro? Quasi, ratione provident? Pariatur a quibusdam optio saepe quo dolor id molestiae, quisquam ut sapiente nostrum iste, exercitationem sequi repudiandae error nemo, cupiditate maxime incidunt. Blanditiis, assumenda reiciendis dignissimos similique soluta eum illo ducimus saepe? Et officia a cupiditate natus! Dolores corrupti consequatur quae dolor molestiae aliquam veritatis tempora quidem eius cupiditate mollitia consequuntur temporibus, vero, debitis, quod aut magni exercitationem in dolore velit porro? Veniam eum maiores soluta earum magnam praesentium quos odit. Repellat eius harum maiores quibusdam earum itaque suscipit tempore.</div>
                   </div>   
            </div>
        </div>
     </ContainerContent>
    )
}