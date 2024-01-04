import { FC, useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonMain } from "shared/buttons";
import { InputContent, TextareaContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { useGetAllAdsQuery, usePostAdvMutation, usePostImgInAdvMutation } from "store/index";
import { useNavigate } from "react-router";
import { IPostAdv } from "interface/api-interface";
import { AddImgInModal } from "./ui/add-img";

interface INewAdd {
    setOpenNewAd: (arg: boolean) => void;
}

export const AddNewAd:FC<INewAdd> = ({setOpenNewAd}) => {
    const {data: allAds} = useGetAllAdsQuery(0);
    const [postAd] = usePostAdvMutation();
    const [postImg] = usePostImgInAdvMutation();
    const navigate = useNavigate();
    const [currentImg, setCurrentImg] = useState<object[]>([]);

    const {
        handleSubmit,
        control,
        reset
    } = useForm<IPostAdv>({
        mode:'onChange',
        defaultValues: {
            title: '',
            description: '',
            price: 0,
        }
    });

    const form = useId()

    const handleChange: SubmitHandler<IPostAdv> = (data) => {
        console.log(data);
        postAd(data).then((res) => {
            // передаю картинки в запрос
            if(currentImg) {
                for (let i = 0; i < 5; i++) {
                    addImgInRequest(res.data.id, currentImg[i])
                }
            }
        });
        navigate('/');
        reset();
    }

    const addImgInRequest = (newIdAd: number, formData: object) => {
        if(allAds) {
            postImg({id: newIdAd, body: formData})
            .then((data) => console.log(data))
        }
    }

    return (
        <div
        onClick={() => setOpenNewAd(false)}
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center">
            <form
            id={form}
            onSubmit={handleSubmit(handleChange)}
            onClick={e => e.stopPropagation()}
            className="w-600 bg-white absolute rounded-lg p-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl">Новое объявление</h2>
                    <div
                    onClick={() => setOpenNewAd(false)}
                    className="text-gray-400 cursor-pointer"
                    >
                        <GrClose />
                    </div>
                </div>
                <div>
                    <div>
                        <h4 className="text-base pt-8 pb-1">Название</h4>
                        <InputContent
                            control={control}
                            name="title"
                            placeholder="Введите название"
                            type="text"
                            width="500px"
                        />
                    </div>

                    <div>
                        <h4 className="text-base pt-8 pb-1">Описание</h4>
                        <TextareaContent
                            control={control}
                            name="description"
                            placeholder="Введите описание"
                            width="100%"
                            height="200px"
                        />
                    </div>
                    <div className="pt-8 pb-1">
                        <div className="flex gap-3">
                            <h4 className="text-base">Фотографии товара</h4>
                            <h5 className="grey-add-text">не более 5 фотографий</h5>
                        </div>
                        <div className="flex gap-2 pt-1">
                            <AddImgInModal
                                idIndex={0}
                                currentImg={currentImg}
                                setCurrentImg={setCurrentImg}
                            />
                            <AddImgInModal
                                idIndex={1}
                                currentImg={currentImg}
                                setCurrentImg={setCurrentImg}
                            />
                            <AddImgInModal
                                idIndex={2}
                                currentImg={currentImg}
                                setCurrentImg={setCurrentImg}
                            />
                            <AddImgInModal
                                idIndex={3}
                                currentImg={currentImg}
                                setCurrentImg={setCurrentImg}
                            />
                            <AddImgInModal
                                idIndex={4}
                                currentImg={currentImg}
                                setCurrentImg={setCurrentImg}
                            />
                        </div>
                    </div>
                    <div className="pb-8">
                        <h4 className="text-base pt-8 pb-1">Цена</h4>
                        <InputContent
                            control={control}
                            name="price"
                            placeholder="Цена"
                            type="number"
                            addSymbol="₽"
                        />
                    </div>

                    <ButtonMain
                        type="submit"
                        text="Опубликовать" 
                        width='w-44'
                    />
                </div>
            </form>
        </div>
    )
}