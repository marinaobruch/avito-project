import { IComment } from "interface/common-interface";
import { FC, useEffect, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonMain } from "shared/buttons";
import { TextareaContent } from "shared/inputs";
import { GrClose } from "react-icons/gr";
import { ICommentsRequest, IRequestAds } from "interface/api-interface";
import { createDate } from "utils/createDate";
import { useGetCommentsMutation, usePostCommentMutation } from "store/index";


interface INewAdd {
    setOpenModalComments: (arg0:boolean)=>void;
    comments: ICommentsRequest[],
    setComments: (comments: ICommentsRequest[]) => void;
    adById: IRequestAds;
}

export const Comments:FC<INewAdd> = ({setOpenModalComments, comments, setComments, adById}) => {
    const [getComments] = useGetCommentsMutation();
    const [postComment] = usePostCommentMutation();
    
    useEffect(() => {
        loadComments();
      }, [adById]);

    const loadComments = () => {
        getComments(adById.id).then((res) => {      
          if (res.data) setComments(res.data);
        }).catch((error) => console.log(error))
      }
    
      const handlePublishComment: SubmitHandler<IComment>  = async (data) => {
        postComment({ id: adById.id, body: data.review }).then(() => {
          loadComments();
        }).catch((error) => console.log(error));
        reset();
      }

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

    return (
        <div
        onClick={() => setOpenModalComments(false)}
        className="w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center">
            <form
            id={form}
            onSubmit={handleSubmit(handlePublishComment)}
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
                <div className="overflow-x-auto overflow-y-auto w-full h-75vh">
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