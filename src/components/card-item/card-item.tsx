import { useNavigate } from "react-router"
import { useGetAllAdsQuery } from "store/services";
import { createDate } from "utils/createDate";

export const CardItem = () => {
    const navigate = useNavigate();
    const {data, isLoading} = useGetAllAdsQuery(100);
    const handleMoveToCard = () => navigate('/product')

    return (
        <>
        {isLoading
        ? <div>Liadong</div>
        :
        <div className="grid grid-cols-8 gap-6 mt-3">
        {data?.map((item) => (
        <div key={item.id} className="col-span-2" onClick={handleMoveToCard}>
            <div className="w-72 h-72 bg-slate-200 cursor-pointer">
            {item.images[0]
            ?
            <img
            src={`http://localhost:8090/${item.images[0].url}`}
            alt={item.title} />
            :
            null
            }
            </div>
            <div className="text-2xl text-sky-500 cursor-pointer">{item.title}</div>
            <div className="text-2xl">{item.price} ₽</div>
            <div className="text-lg text-gray-400">{item.user.city}</div>
            <div className="text-lg text-gray-400">{createDate(item.created_on)}</div>
        </div>
        ))}
    </div>    
        }

        </>
    )
}
