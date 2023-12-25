import { IAddNewAd } from "interface/common-interface";
import { FC, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonMain } from "shared/buttons";
import { InputContent, InputImg } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { usePostAdvMutation } from "store/index";
import { useNavigate } from "react-router";

interface INewAdd {
    setOpenNewAd: (arg0:boolean)=>void;
}

export const AddNewAd:FC<INewAdd> = ({setOpenNewAd}) => {
    const [postAd] = usePostAdvMutation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        reset
    } = useForm<IAddNewAd>({
        mode:'onChange',
        defaultValues: {
            title: '',
            description: '',
            photo1: '',
            photo2: '',
            photo3: '',
            photo4: '',
            photo5: '',
            price: '',

        }
    });

    const form = useId()

    const handleChange: SubmitHandler<IAddNewAd> = (data) => {
        postAd(data).then((res) => console.log(res));
        console.log(data);
        navigate('/');
        reset();
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
                            <InputImg
                                control={control}
                                name="photo1"
                                type="file"
                                id="picture1"
                            />
                            <InputImg
                                control={control}
                                name="photo2"
                                type="file"
                                id="picture2"
                            />
                            <InputImg
                                control={control}
                                name="photo3"
                                type="file"
                                id="picture3"
                            />
                            <InputImg
                                control={control}
                                name="photo4"
                                type="file"
                                id="picture4"
                            />
                            <InputImg
                                control={control}
                                name="photo5"
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
                        text="Опубликовать" 
                        width="181px"
                    />
                </div>
            </form>
        </div>
    )
}