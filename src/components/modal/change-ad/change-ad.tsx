import { FC, useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {    ButtonMainDisabled } from "shared/buttons";
import { InputContent, TextareaContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { IBodyForPatchAd, IRequestAds } from "interface/api-interface";
import { usePatchAdvMutation, usePostImgInAdvMutation } from "store/index";
import { PiPlusThin } from "react-icons/pi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ModalImgDelete } from "..";

interface INewAdd {
    setOpenModalRedactor: (arg: boolean) => void;
    adById: IRequestAds;
}

export const ChangeAd:FC<INewAdd> = ({setOpenModalRedactor, adById}) => {

    const [patchAdv] = usePatchAdvMutation();
    const [postImg] = usePostImgInAdvMutation();

    const [imgForDelete, setImgForDelete] = useState<string>('');
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        reset,
        watch
    } = useForm<IBodyForPatchAd>({
        mode:'onChange',
        defaultValues: {
            title: adById?.title,
            description: adById?.description,
            price: Number(adById?.price),

        }
    });

    const title = watch('title')
    const description = watch('description')
    const price = watch('price')

    const isValid = title !== adById?.title ||
                    description !== adById?.description ||
                    price !== Number(adById?.price)

    const form = useId();
    const handleChange: SubmitHandler<IBodyForPatchAd> = async (data) => {
        await patchAdv({
            id: adById.id,
            body: data,
          }).then((res) => console.log(res))
            .catch((error) => console.log(error));
          
        reset();
        setOpenModalRedactor(false);
    };

    const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
                postImg({id: adById.id, body: formData})
                .then((data) => console.log(data))
            }
        }
    }

    const handleClickToDeleteImg = (e: React.MouseEvent<HTMLDivElement>, urlId: string ) => {
        e.stopPropagation();
        setDeleteModal(true);
        setImgForDelete(urlId);
    }

    return (
        <div
        onClick={() => setOpenModalRedactor(false)}
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center">
            <form
            id={form}
            onSubmit={handleSubmit(handleChange)}
            onClick={e => e.stopPropagation()}
            className="w-600 bg-white absolute rounded-lg p-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl">Редактировать объявление</h2>
                    <div
                    onClick={() => setOpenModalRedactor(false)}
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
                                    onChange={handleImgUpload}
                                />
                                {
                                adById.images[0]
                                ?   <div
                                        className="relative"
                                        onClick={(e) => handleClickToDeleteImg(e, adById.images[0].url)}
                                    >  
                                        <label className="w-24 h-24 bg-gray-200 cursor-pointer" htmlFor='file_1'>
                                            <img alt="" src={`http://localhost:8090/${adById.images[0]?.url}`} className="w-24 h-24 object-cover p-1 bg-gray-100"/>
                                        </label>
                                        <span className="delete-img easy-animation">
                                            <div className="opacity-0 opacity-move hover:opacity-100">
                                                <MdOutlineDeleteOutline />
                                            </div>
                                        </span>
                                        {deleteModal && 
                                            <ModalImgDelete 
                                                setOpenModalDelete={setDeleteModal}
                                                adId={adById.id}
                                                file_url={imgForDelete}
                                            />
                                        }
                                    </div>
                                :   <label className="label-img w-24 h-24" htmlFor='file_1'>
                                        <PiPlusThin />
                                    </label>
                                    
                                }
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_2'
                                    onChange={handleImgUpload}
                                />
                                {
                                adById.images[1]
                                ?   <div
                                        className="relative"
                                        onClick={(e) => handleClickToDeleteImg(e, adById.images[1].url)}
                                    >
                                        <label className="w-24 h-24 bg-gray-200 cursor-pointer" htmlFor='file_2'>
                                            <img alt="" src={`http://localhost:8090/${adById.images[1]?.url}`} className="w-24 h-24 object-cover p-1 bg-gray-100"/>
                                        </label>
                                        <span className="delete-img easy-animation">
                                            <div className="opacity-0 opacity-move hover:opacity-100">
                                                <MdOutlineDeleteOutline />
                                            </div>
                                        </span>
                                    </div>
                                :   <label className="label-img w-24 h-24" htmlFor='file_2'>
                                        <PiPlusThin />
                                    </label>
                                }
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_3'
                                    onChange={handleImgUpload}
                                />
                                {
                                adById.images[2]
                                ?   <div
                                        className="relative"
                                        onClick={(e) => handleClickToDeleteImg(e, adById.images[2].url)}
                                    >
                                        <label className="w-24 h-24 bg-gray-200 cursor-pointer" htmlFor='file_3'>
                                            <img alt="" src={`http://localhost:8090/${adById.images[2]?.url}`} className="w-24 h-24 object-cover p-1 bg-gray-100"/>
                                        </label>
                                        <span className="delete-img easy-animation">
                                            <div className="opacity-0 opacity-move hover:opacity-100">
                                                <MdOutlineDeleteOutline />
                                            </div>
                                        </span>
                                    </div>
                                :   <label className="label-img w-24 h-24" htmlFor='file_3'>
                                        <PiPlusThin />
                                    </label>
                                }
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_4'
                                    onChange={handleImgUpload}
                                />
                                {
                                adById.images[3]
                                ?   <div
                                        className="relative"
                                        onClick={(e) => handleClickToDeleteImg(e, adById.images[3].url)}
                                    >
                                        <label className="w-24 h-24 bg-gray-20 cursor-pointer" htmlFor='file_4'>
                                            <img alt="" src={`http://localhost:8090/${adById.images[3]?.url}`} className="w-24 h-24 object-cover p-1 bg-gray-100"/>
                                        </label>
                                        <span className="delete-img easy-animation">
                                            <div className="opacity-0 opacity-move hover:opacity-100">
                                                <MdOutlineDeleteOutline />
                                            </div>
                                        </span>
                                    </div>
                                :   <label className="label-img w-24 h-24" htmlFor='file_4'>
                                        <PiPlusThin />
                                    </label>
                                }
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file" 
                                    id='file_5'
                                    onChange={handleImgUpload}
                                />
                                {
                                adById.images[4]
                                ?   <div
                                        className="relative"
                                        onClick={(e) => handleClickToDeleteImg(e, adById.images[4].url)}
                                    >
                                        <label className="w-24 h-24 bg-gray-200 cursor-pointer" htmlFor='file_5'>
                                            <img alt="" src={`http://localhost:8090/${adById.images[4]?.url}`} className="w-24 h-24 object-cover p-1 bg-gray-100"/>
                                        </label>
                                        <span className="delete-img easy-animation">
                                            <div className="opacity-0 opacity-move hover:opacity-100">
                                                <MdOutlineDeleteOutline />
                                            </div>
                                        </span>
                                    </div>
                                :   <label className="label-img w-24 h-24" htmlFor='file_5'>
                                        <PiPlusThin />
                                    </label>
                                }
                            </div>
                        </div>
                        <div className="text-xs pt-4 text-sky-500">Фото изменяются автоматически после удаления/добавления</div>
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

                    <ButtonMainDisabled
                        type="submit"
                        text="Сохранить"
                        width="181px"
                        disabled={isValid}
                    />
                </div>
            </form>
        </div>
    )
}