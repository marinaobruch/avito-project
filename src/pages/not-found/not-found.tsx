import { PiSmileySadThin } from "react-icons/pi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <div className="h-64 relative p-28">
            <div className="absolute top-96 flex flex-col gap-20">
                <div className=" flex items-center gap-8">
                    <h1 className="text-9xl text-sky-500">PAGE NOT FOUND</h1>
                    <div className="text-9xl text-sky-500">
                        <PiSmileySadThin />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                    <div className="text-3xl">Register and try again!</div>
                    <MdKeyboardDoubleArrowRight />
                    <NavLink to={'/register'}>
                        <div className="text-3xl hover:text-green-500 hover:underline active:text-green-800">GO TO REGISTER</div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}