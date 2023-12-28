import { IUserRequest } from "interface/api-interface";
import { FC } from "react";
import { usePostImgUserMutation } from "store/index";

interface IPrors {
    setProfileImage: (e: File) => void;
    getUser: IUserRequest | undefined;
}

export const UserAvatar: FC<IPrors> = ({setProfileImage, getUser}) => {
    const [postAvatar] = usePostImgUserMutation();

      const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0];
        if (file) {
          setProfileImage(file);

          const formData = new FormData()
          if (file) {
            formData.append('file', file);
            console.log(file);
            postAvatar(formData).then((data) => console.log(data))
          }
        }
      }

    return (
        <div className="flex flex-col items-center">
            <div className="bg-gray-200 w-44 h-44 rounded-full mb-4">
                <div>
                    {getUser?.avatar
                    ? <img className="w-44 h-44 object-cover" src={`http://localhost:8090/${getUser?.avatar}`} alt="" />
                    : null
                    }
                </div>
            </div>
            <input
                className="hidden"
                type="file" 
                id='file-upload'
                onChange={handleAvatar}
            />
            <div
                className="text-lg text-sky-500 hover:text-sky-800 hover:cursor-pointer"
                onClick={() => document.getElementById('file-upload')?.click()}
            > Заменить </div>
        </div>
    )
}