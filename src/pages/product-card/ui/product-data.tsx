import { ChangeAd, Comments, ModalCardDelete } from "components/modal";
import { useAppSelector } from "hooks/use-api";
import { ICommentsRequest, IRequestAds } from "interface/api-interface";
import { FC, useEffect, useState } from "react";
import { ButtonMain } from "shared/buttons"
import { useGetCommentsMutation } from "store/index";
import { CreateHideNumber, createDate, numberWithSpaces } from "utils";

interface IProps {
    adById: IRequestAds;
}

export const ProductAdData: FC<IProps> = ({ adById }) => {
    const [getComments] = useGetCommentsMutation();
    const currentUserData = useAppSelector((state) => state.user.userData);
    const adUser = adById.user;
    const adId = adById.id;
    const model = adUser.email === currentUserData.email ? 'creator' : 'user'

    const [comments, setComments] = useState<ICommentsRequest[]>([]);

    const [hideNumber, setHideNumber] = useState<boolean>(false);
    const [openModalRedactor, setOpenModalRedactor] = useState<boolean>(false);
    const [openModalComments, setOpenModalComments] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

    useEffect(() => {
        loadComments();
      }, [adById]);

    const loadComments = () => {
        getComments(adById.id).then((res) => {      
          if (res.data) setComments(res.data);
        }).catch((error) => console.log(error))
      }

    const phoneNumber: string | undefined = adById?.user?.phone ? adById?.user?.phone : 'нет номера';
    const phoneNumberHide = adById?.user?.phone ? CreateHideNumber(phoneNumber) : 'нет номера';

    const handleShowNumber = () => setHideNumber((prev) => !prev);
    const handleOpenRedactor = () => setOpenModalRedactor(true);
    const handleOpenComments = () => setOpenModalComments(true);
    const handleDeleteAd = () => setOpenModalDelete(true);

    const formatedDate: string = createDate(adById?.created_on);

    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className="text-3xl pb-3 max-w-xl font-robotoMedium">{adById?.title}</div>
                <div className="grey-add-text">{formatedDate}</div>
                <div className="grey-add-text">{adById?.user.city}</div>
            </div>
            <div
                onClick={handleOpenComments}
                className="text-base text-sky-500 cursor-pointer">
                {comments.length} отзыва
            </div>
            <div className="text-3xl pt-9 pb-5 lg:py-5 font-robotoMedium">{numberWithSpaces(adById?.price)} ₽</div>
            {model === 'user'
            ?
            <div>
                <ButtonMain
                    type="button"
                    onClick={handleShowNumber}
                    text={hideNumber ? phoneNumber : phoneNumberHide}
                    width="100%"
                />
            </div>
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
                <ChangeAd
                    setOpenModalRedactor={setOpenModalRedactor}
                    adById={adById}
                />}
            {openModalDelete &&
                <ModalCardDelete
                    setOpenModalDelete={setOpenModalDelete}
                    adId={adId}
            />}
            {openModalComments &&
                <Comments
                    setOpenModalComments={setOpenModalComments}
                    comments={comments}
                    setComments={setComments}
                    adById={adById}
                />
            }
        </div>
    )
}