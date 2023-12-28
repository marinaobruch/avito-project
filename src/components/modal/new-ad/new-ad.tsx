import { FC, useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonMain } from "shared/buttons";
import { InputContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { useGetAllAdsQuery, usePostAdvMutation, usePostImgInAdvMutation } from "store/index";
import { useNavigate } from "react-router";
import { IPostAdv } from "interface/api-interface";
import { PiPlusThin } from "react-icons/pi";

interface INewAdd {
    setOpenNewAd: (arg: boolean) => void;
}

export const AddNewAd:FC<INewAdd> = ({setOpenNewAd}) => {
    const {data: allAds} = useGetAllAdsQuery(0);
    const [postAd] = usePostAdvMutation();
    const [postImg] = usePostImgInAdvMutation();
    const navigate = useNavigate();
    const [currentImg, setCurrentImg] = useState<object>();


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
            // передаю картинки
            if(currentImg) {
                addImgInRequest(res.data.id, currentImg)
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

    const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
                console.log(file);
                setCurrentImg(formData);
            }
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
                        <InputContent
                            control={control}
                            name="description"
                            placeholder="Введите описание"
                            type="text"
                            width="500px"
                            height="200px"
                        />
                    </div>

                    <div className="pt-8 pb-1">
                        <div className="flex gap-3">
                            <h4 className="text-base">Фотографии товара</h4>
                            <h5 className="grey-add-text">не более 5 фотографий</h5>
                        </div>
                        <div className="flex gap-2 pt-1">
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_1'
                                    onChange={handleAvatar}
                                />
                                <label className="label-img" htmlFor='file_1'>   
                                    <PiPlusThin />
                                </label>
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_2'
                                    onChange={handleAvatar}
                                />
                                <label className="label-img" htmlFor='file_2'>
                                    <PiPlusThin />
                                </label>
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_3'
                                    onChange={handleAvatar}
                                />
                                <label className="label-img" htmlFor='file_3'>   
                                    <PiPlusThin />
                                </label>
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_4'
                                    onChange={handleAvatar}
                                />
                                <label className="label-img" htmlFor='file_4'>
                                    <PiPlusThin />
                                </label>
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_5'
                                    onChange={handleAvatar}
                                />
                                <label className="label-img" htmlFor='file_5'>
                                    <PiPlusThin />
                                </label>
                            </div>
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
                        width="181px"
                    />
                </div>
            </form>
        </div>
    )
}


    // const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault()
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const formData = new FormData();
    //         if (file) {
    //             formData.append('file', file);
    //             console.log(file);
    //             if(allAds) {
    //                 postImg({id: allAds?.length + 1, body: formData})
    //                 .then((data) => console.log(data))
    //             }
    //         }
    //     }
    // }