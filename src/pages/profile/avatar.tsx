import { IUserRequest } from "interface/api-interface";
import { FC } from "react";
import { usePostImgUserMutation } from "store/index";

interface IPrors {
    setProfileImage: (e: File) => void;
    getUser: IUserRequest | undefined;
}

export const UserAvatar: FC<IPrors> = ({setProfileImage, getUser}) => {
    const [postAvatar] = usePostImgUserMutation();

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        console.log(files);
        if (files) {
            const formData = new FormData()
            formData.append('myFile', files[0])
            setProfileImage(files[0]);

            postAvatar(formData).then((data) => console.log(data))
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
                // className="hidden"
                type="file" 
                id='file-upload' 
                onChange={(event) => {handleAvatarUpload(event)}}
            />
            <a
                className="text-lg text-sky-500 hover:text-sky-800 hover:cursor-pointer"    
                target="_self"
                onClick={handleSaveProfileAvatar}
            >
                Заменить
            </a>
        </div>
    )
}