import { FC } from "react";
import { ButtonMain } from "shared/buttons";
import { useDeleteImgMutation } from "store/index";


interface IProps {
    setOpenModalDelete: (arg: boolean) => void;
    adId: number;
    file_url?: string;
}

export const ModalImgDelete: FC<IProps> = ({setOpenModalDelete, adId, file_url}) => {
    const [deleteImgAd] = useDeleteImgMutation();

    const handleDeleteAd = (e: React.MouseEvent<Element, MouseEvent>) => {
        console.log(file_url);
        e.stopPropagation();
        deleteImgAd({ id: adId, file_url: file_url }).then((res) => console.log(res));
        setOpenModalDelete(false)
    }
    return (
        <div
        onClick={() => setOpenModalDelete(false)}
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center">
            <div
                className="w-96 h-60 bg-slate-200 rounded-2xl flex-col items-center justify-evenly"
                onClick={e => e.stopPropagation()}
            >
                <h1 className="text-2xl text-sky-600 p-8">Вы действительно хотите удалить изображение?</h1>
                <div className="flex items-center justify-center gap-4">
                    <ButtonMain 
                        text='Да'
                        width='150px'
                        onClick={(e) => handleDeleteAd(e)}
                        type='button'
                    />
                    <ButtonMain 
                        text='Нет'
                        width='150px'
                        onClick={() => setOpenModalDelete(false)}
                        type='button'
                    />

                </div>
            </div>
        </div>
    )
}