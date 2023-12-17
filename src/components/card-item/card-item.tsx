import { useNavigate } from "react-router"

export const CardItem = () => {
    const navigate = useNavigate()

    const handleMoveToCard = () => navigate('/product')

    return (
        <div className="col-span-2" onClick={handleMoveToCard}>
            <div className="w-72 h-72 bg-slate-200 cursor-pointer"></div>
            <div className="text-2xl text-sky-500 cursor-pointer">Ракетка для большого тенниса Триумф Про</div>
            <div className="text-2xl">2 200 ₽</div>
            <div className="text-lg text-gray-400">Санкт-Петербург</div>
            <div className="text-lg text-gray-400">Сегодня в 10-45</div>
        </div>
    )
}