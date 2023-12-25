import { IUserRequest } from "interface/api-interface";
import { FC, useState } from "react";
import { usePostImgUserMutation } from "store/index";

interface IPrors {
    setProfileImage: (e: File) => void;
    getUser: IUserRequest | undefined;
}

export const UserAvatar: FC<IPrors> = ({setProfileImage, getUser}) => {
    console.log(getUser);
    const [postAvatar] = usePostImgUserMutation();
    const [image, setImage] = useState('')

    const handleAvatarUpload = (file: File) => {
        const formData = new FormData();
        if (file) {
        console.log(formData);
        formData.append('file', file);
        console.log(formData);
        postAvatar(formData).then((data) => console.log(data));
        }
    }

    const handleSaveProfileAvatar = () => {
        console.log('done');
    }

    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-200 w-44 h-44 rounded-full mb-4">
                <a href="#" target="_self">
                    {getUser?.avatar
                    ? <img src={`http://localhost:8090/${getUser?.avatar}`} alt="" />
                    : null
                    }
                </a>
            </div>
            <input
                className="hidden"
                type="file"
                id='file-upload'
                accept="image/*"
                onChange={(event) => {
                    event.preventDefault();
                    const file = event.target.files?.[0];
                    console.log(file);
                    if (file) {
                        setProfileImage(file)
                        handleAvatarUpload(file)
                    }
                }} 
            />
            <a
                target="_self"
                onClick={handleSaveProfileAvatar}
                className="text-lg text-sky-500 hover:text-sky-800 hover:cursor-pointer"
            >
                Заменить
            </a>
        </div>
    )
}