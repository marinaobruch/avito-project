import { PiPlusThin } from "react-icons/pi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { usePostImgInAdvMutation } from "store/index";
import { FC, useState } from "react";
import { IRequestAds } from "interface/api-interface";
import { ModalImgDelete } from "./delete-img";


interface IProps {
    adById: IRequestAds;
    indexImg: number;
}

export const ChangeImgImModal:FC<IProps> = ({adById, indexImg}) => {

    const [postImg] = usePostImgInAdvMutation();

    const [imgForDelete, setImgForDelete] = useState<string>('');
    const [deleteModal, setDeleteModal] = useState<boolean>(false);


    const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0];
        console.log(file);
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
        console.log(urlId);
        e.stopPropagation();
        setDeleteModal(true);
        setImgForDelete(urlId);
    }

    return (
        <div>
        <input
            className="hidden"
            type="file" 
            id={`file_${indexImg}`}
            onChange={handleImgUpload}
        />
        {
        adById.images[indexImg]
        ?   <div
                className="relative"
                onClick={(e) => handleClickToDeleteImg(e, adById.images[indexImg].url)}
            >  
                <label
                    className="w-24 h-24 bg-gray-200 cursor-pointer"
                    htmlFor={`file_${indexImg}`}
                >
                    <img alt="" src={`http://localhost:8090/${adById.images[indexImg]?.url}`} className="w-24 h-24 object-cover p-1 bg-gray-100"/>
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
    )

}