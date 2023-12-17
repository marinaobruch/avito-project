export const ItemComment = () => {
    return (
        <div className="pt-9 flex items-start gap-5">
            <div>
                <div className="w-10 h-10 bg-gray-200 rounded-full">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="flex-col">
                <div className="flex items-center gap-4 pb-4">
                    <div className="text-base font-robotoMedium">Олег</div>
                    <div className="grey-add-text">14 августа</div>
                </div>
                <div className="text-base font-robotoMedium">Комментарий</div>
                <div className="text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
            </div>
        </div>
    )
}