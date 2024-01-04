import { FC, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonMainDisabled } from "shared/buttons";
import { InputContent, TextareaContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { IBodyForPatchAd, IRequestAds } from "interface/api-interface";
import { usePatchAdvMutation } from "store/index";
import { ChangeImgImModal } from "./ui/change-img";

interface INewAdd {
    setOpenModalRedactor: (arg: boolean) => void;
    adById: IRequestAds;
}

export const ChangeAd:FC<INewAdd> = ({setOpenModalRedactor, adById}) => {

    const [patchAdv] = usePatchAdvMutation();

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
                            width="w-full"
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

                            <ChangeImgImModal adById={adById} indexImg={0}/>
                            <ChangeImgImModal adById={adById} indexImg={1}/>
                            <ChangeImgImModal adById={adById} indexImg={2}/>
                            <ChangeImgImModal adById={adById} indexImg={3}/>
                            <ChangeImgImModal adById={adById} indexImg={4}/>

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