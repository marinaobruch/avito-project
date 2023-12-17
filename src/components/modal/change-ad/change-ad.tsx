import { FC, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IAddNewAd } from "interface/common-interface";
import { ButtonMain } from "shared/buttons";
import { InputContent, InputImg, TextareaContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";

interface INewAdd {
    setOpenModalRedactor: (arg0:boolean)=>void;
}

const someAdd = {
    'name': 'Ракетка для большого тенниса Triumph Pro STС Б/У',
    'description': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae eveniet saepe dolorum eligendi! Sed molestiae deleniti porro?',
    'photo1': '',
    'photo2': '',
    'photo3': '',
    'photo4': '',
    'photo5': '',
    'price': '2200',
}

export const ChangeAd:FC<INewAdd> = ({setOpenModalRedactor}) => {
    const {
        handleSubmit,
        control,
        reset
    } = useForm<IAddNewAd>({
        mode:'onChange',
        defaultValues: {
            name: someAdd.name,
            description: someAdd.description,
            photo1: '',
            photo2: '',
            photo3: '',
            photo4: '',
            photo5: '',
            price: someAdd.price,

        }
    });

    const form = useId()

    const handleChange: SubmitHandler<IAddNewAd> = (data) => {
        console.log(data);
        reset()
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
                            name="name"
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
                            <InputImg
                                control={control}
                                name="photo1"
                                placeholder="Введите описание"
                                type="file"
                                id="picture1"
                            />
                            <InputImg
                                control={control}
                                name="photo2"
                                placeholder="Введите описание"
                                type="file"
                                id="picture2"
                            />
                            <InputImg
                                control={control}
                                name="photo3"
                                placeholder="Введите описание"
                                type="file"
                                id="picture3"
                            />
                            <InputImg
                                control={control}
                                name="photo4"
                                placeholder="Введите описание"
                                type="file"
                                id="picture4"
                            />
                            <InputImg
                                control={control}
                                name="photo5"
                                placeholder="Введите описание"
                                type="file"
                                id="picture5"
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
                        text="Сохранить" 
                        width="181px"
                    />
                </div>
            </form>
        </div>
    )
}