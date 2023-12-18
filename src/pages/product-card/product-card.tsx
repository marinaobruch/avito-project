import { ChangeAd, Comments } from "components/modal";
import { BackToMainPage, ContainerContent } from "layouts/container"
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { ButtonMain } from "shared/buttons"
import { useGetAdByIdQuery } from "store/services";
import { CreateHideNumber, createDate, createSellerBy } from "utils";
import { FaRegUserCircle } from "react-icons/fa";

// const mode:string = 'user'
const mode:string = 'creator'

export const ProductCard = () => {

    const [hideNumber, setHideNumber] = useState<boolean>(false);
    const [openModalRedactor, setOpenModalRedactor] = useState<boolean>(false);
    const [openModalComments, setOpenModalComments] = useState<boolean>(false);
    const { id } = useParams();
    const toNumber = Number(id);
    console.log(toNumber);

    const { data: adById } = useGetAdByIdQuery(toNumber);
    console.log(adById);

    const phoneNumber = adById?.user.phone;
    const phoneNumberHide = CreateHideNumber(phoneNumber);

    const handleShowNumber = () => setHideNumber((prev) => !prev);
    const handleOpenRedactor = () => setOpenModalRedactor(true);
    const handleOpenComments = () => setOpenModalComments(true);
    const handleDeleteAd = () => alert("Товар удален");

    const formatedDate = createDate(adById?.created_on);
    const periopOfSales = createSellerBy(adById?.created_on);

    return (
        <ContainerContent>
        {adById &&
        <div>
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
                        <div className="text-3xl pb-3 max-w-xl">{adById?.title}</div>
                        <div className="grey-add-text">{formatedDate}</div>
                        <div className="grey-add-text">{adById?.user.city}</div>
                        <div
                            onClick={handleOpenComments}
                            className="text-base text-sky-500 cursor-pointer">
                            23 отзыва
                        </div>
                        <div className="text-3xl pt-9 pb-5">{adById?.price} ₽</div>
                        {mode === 'user'
                        ?
                        <ButtonMain
                            type="button"
                            onClick={handleShowNumber}
                            text= {hideNumber ? phoneNumber : phoneNumberHide}
                            width="214px"
                        />
                        :
                        <div className="flex gap-2">
                            <ButtonMain
                                onClick={handleOpenRedactor}
                                type="button"
                                text= 'Редактировать'
                                width="214px"
                            />
                            <ButtonMain
                                onClick={handleDeleteAd}
                                type="button"
                                text= 'Снять с публикации'
                                width="214px"
                            />
                        </div>
                        }
                        {openModalRedactor && 
                        <ChangeAd setOpenModalRedactor={setOpenModalRedactor} />}
                        <NavLink to={'/profile-seller'}>
                            <div className="pt-9 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200">
                                    {adById?.user?.avatar
                                    ? <img
                                        src={`http://localhost:8090/${adById.user.avatar}`}
                                        alt={adById.user.avatar}
                                    />
                                    : <FaRegUserCircle />
                                    }
                                </div>
                                <div>
                                    <div className="text-xl text-sky-500">{adById?.user.name}</div>
                                    <div className="grey-add-text">Продает товары с {periopOfSales}</div>
                                </div>
                            </div>
                        </NavLink>

                    </div>
                </div>      

                   <div className="mt-16">
                        <h3 className="text-4xl mb-8">Описание товара</h3>
                        {adById?.description
                        ? <div className="text-base max-w-792">{adById?.description}</div>
                        : <div className="text-base max-w-792">Описание товара отсутствует</div>
                        }

                   </div>   
            </div>
        </div>

        {openModalComments && <Comments setOpenModalComments={setOpenModalComments} />}
            </div>
            }

     </ContainerContent>
    )
}