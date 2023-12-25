import { FC } from "react";
import { GrClose } from "react-icons/gr";


interface IProps {
    text: string;
    setOpenModalWarning: (arg: boolean) => void;
}

export const ModalCardWarning: FC<IProps> = ({text, setOpenModalWarning}) => {
    return (
        <div
        onClick={() => setOpenModalWarning(false)}
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center">
            <div
                className="w-96 h-60 bg-slate-200 rounded-2xl flex items-center justify-evenly"
                onClick={e => e.stopPropagation()}
            >
                <h1 className="text-2xl text-sky-600">{text}</h1>
                <div
                    onClick={() => setOpenModalWarning(false)}
                    className="text-sky-600 cursor-pointer"
                >
                    <GrClose />
                </div>
            </div>
        </div>
    )
}