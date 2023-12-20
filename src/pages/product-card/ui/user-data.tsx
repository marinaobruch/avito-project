import { NavLink } from "react-router-dom"
import { createSellerBy } from "utils";
import { FaRegUserCircle } from "react-icons/fa";
import { FC } from "react";
import { IRequestAds } from "interface/api-interface";

interface IProps {
    adById: IRequestAds;
}

export const UserAdData: FC<IProps> = ({adById}) => {
    const periopOfSales: string = createSellerBy(adById?.created_on);

    return (
        <NavLink to={'/profile-seller'}>
            <div className="pt-9 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 reg-flex">
                    {adById?.user?.avatar
                    ? <img
                        src={`http://localhost:8090/${adById.user.avatar}`}
                        alt={adById.user.avatar}
                    />
                    : <FaRegUserCircle />
                    }
                </div>
                <div>
                    <div className="text-xl text-sky-500 font-robotoMedium">{adById?.user.name}</div>
                    <div className="grey-add-text">Продает товары с {periopOfSales}</div>
                </div>
            </div>
        </NavLink>
    )
}