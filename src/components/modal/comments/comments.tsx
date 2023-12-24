import { IComment } from "interface/common-interface";
import { FC, useId, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonMain } from "shared/buttons";
import { TextareaContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { useScrollbar } from "hooks/use-scrollbar";
import { ICommentsRequest } from "interface/api-interface";
import { createDate } from "utils/createDate";


interface INewAdd {
    setOpenModalComments: (arg0:boolean)=>void;
    comments: ICommentsRequest[],
}

export const Comments:FC<INewAdd> = ({setOpenModalComments, comments}) => {
    console.log(comments);
    const {
        handleSubmit,
        control,
        reset
    } = useForm<IComment>({
        mode:'onChange',
        defaultValues: {
            review: '',
        }
    });

    const form = useId();
    const commentWrapper = useRef(null);

    useScrollbar(commentWrapper);

    const handleChange: SubmitHandler<IComment> = (data) => {
        console.log(data);
        reset()
    }

    return (
        <div
        onClick={() => setOpenModalComments(false)}
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center">
            <form
            id={form}
            onSubmit={handleSubmit(handleChange)}
            onClick={e => e.stopPropagation()}
            className="w-600 min-h-900 max-h-40 bg-white absolute rounded-lg p-10">
                
                <div className="flex items-center justify-between">
                    <h2 className="text-4xl">Отзывы о товаре</h2>
                    <div
                        onClick={() => setOpenModalComments(false)}
                        className="text-gray-400 cursor-pointer"
                    >
                        <GrClose />
                    </div>
                </div>

                <div>
                    <div className="pb-3">
                        <h4 className="text-base pt-8 pb-3 font-robotoMedium">Добавить отзыв</h4>
                        <TextareaContent
                            control={control}
                            name="review"
                            placeholder="Введите отзыв"
                            width="500px"
                            height="200px"
                        />
                    </div>
                    <ButtonMain
                        type="submit"
                        text="Опубликовать" 
                        width="181px"
                    />
                </div>
                <div 
                    style={{ marginTop: '1rem', maxHeight: '420px' }}
                    ref={commentWrapper}>
                {comments.map((item) => (
                        <div key={item.id} className="pt-9 flex items-start gap-5">
                            <div>
                                <div className="w-10 h-10 bg-gray-200 rounded-full">
                                    <img src="" alt="" />
                                </div>
                            </div>
                            <div className="flex-col">
                                <div className="flex items-center gap-4 pb-4">
                                    <div className="text-base font-robotoMedium">{item.author.name}</div>
                                    <div className="grey-add-text">{createDate(item.created_on)}</div>
                                </div>
                                <div className="text-base font-robotoMedium">Комментарий</div>
                                <div className="text-base">{item.text} </div>
                            </div>
                        </div>
                ))}
                    </div>

            </form>
        </div>
    )
}