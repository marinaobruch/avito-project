import { FC } from "react";
import { IoMdClose } from "react-icons/io";


interface IProps {
    setWarning: (arg: boolean) => void;
    text:string
}

export const ModalWarning: FC<IProps> = ({text, setWarning}) => {
    return (
        <div
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center"
        onClick={() => setWarning(false)} 
        >
            <div
                className="w-96 h-60 bg-slate-200 rounded-2xl flex items-center justify-evenly p-10"
                onClick={e => e.stopPropagation()}
            >
                <h1 className="text-2xl text-sky-600 p-8">{text}</h1>
                <div className="text-sky-600 cursor-pointer" onClick={() => setWarning(false)}>
                    <IoMdClose />
                </div>
            </div>
        </div>
    )
}