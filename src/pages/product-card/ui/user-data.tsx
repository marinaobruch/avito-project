import { createSellerBy } from "utils";
import { FaRegUserCircle } from "react-icons/fa";
import { FC } from "react";
import { IRequestAds } from "interface/api-interface";
import { useNavigate } from "react-router";
import { useAppDispatch } from "hooks/use-api";
import { choiseUser } from "store/slice";

interface IProps {
    adById: IRequestAds;
}

export const UserAdData: FC<IProps> = ({adById}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const periopOfSales: string = createSellerBy(adById?.created_on);
    const userData = adById.user;

    const goToUser = () => {
        navigate(`/profile-seller/${adById.user_id}`);
        dispatch(choiseUser(userData))
    }

    return (
            <div onClick={goToUser} className="pt-9 flex items-center gap-3">
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
    )
}