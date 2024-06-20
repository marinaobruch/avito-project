import { useAppSelector } from 'hooks/use-api'
import { IComment, ICommentRequest, IRequestAds } from 'interface/api-interface'
import { FC, SetStateAction, useEffect, useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ButtonMain } from 'shared/buttons'
import { TextareaContent } from 'shared/inputs'
import { useGetCommentsMutation, usePostCommentMutation } from 'store/index'
import { createDate } from 'utils/createDate'

import { MobileMenu } from 'layouts/layout'
import { FaRegUserCircle } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { IoIosArrowForward } from 'react-icons/io'

interface INewAdd {
  setOpenModalComments: (arg: boolean) => void
  comments: ICommentRequest[]
  setComments: (comments: SetStateAction<ICommentRequest[]>) => void
  adById: IRequestAds
}

export const Comments: FC<INewAdd> = ({
  setOpenModalComments,
  comments,
  setComments,
  adById,
}) => {
  const [getComments] = useGetCommentsMutation()
  const [postComment] = usePostCommentMutation()
  const currentUser = useAppSelector((state) => state.user.userData)
  const form = useId()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadComments()
  }, [adById])

  const loadComments = () => {
    getComments(adById.id)
      .then((res) => {
        if ('data' in res) {
          if (res.data) setComments(res.data)
        }
      })
      .catch((error) => console.log(error))
  }

  const handlePublishComment: SubmitHandler<IComment> = async (data) => {
    if (!currentUser.email) {
      setError('Пожалуйста, зарегистрируйтесь >>>')
      return
    }
    postComment({ id: adById.id, body: data.review })
      .then(() => {
        loadComments()
      })
      .catch((error) => console.log(error))
    reset()
  }

  const { handleSubmit, control, reset } = useForm<IComment>({
    mode: 'onChange',
    defaultValues: {
      review: '',
    },
  })

  const handleToLogin = () => navigate('/login')

  return (
    <div
      onClick={() => setOpenModalComments(false)}
      className='w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center'
    >
      <form
        id={form}
        onSubmit={handleSubmit(handlePublishComment)}
        onClick={(e) => e.stopPropagation()}
        className='lg-min:w-600 lg-min:min-h-900 lg-min:max-h-40 lg:w-full lg:h-full bg-white absolute rounded-lg p-10'
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-4xl'>Отзывы о товаре</h2>
          <div
            onClick={() => setOpenModalComments(false)}
            className='text-gray-400 cursor-pointer lg:hidden'
          >
            <GrClose />
          </div>
          <div
            onClick={() => setOpenModalComments(false)}
            className='text-gray-400 cursor-pointer lg-min:hidden'
          >
            <IoIosArrowForward />
          </div>
        </div>

        <div>
          <div className='pb-3'>
            <h4 className='text-base pt-8 pb-3 font-robotoMedium'>
              Добавить отзыв
            </h4>
            <TextareaContent
              control={control}
              name='review'
              placeholder='Введите отзыв'
              width='100%'
              height='200px'
            />
          </div>
          <ButtonMain type='submit' text='Опубликовать' width='w-44' />
        </div>
        {error && (
          <div className='flex w- items-center justify-center mt-4 gap-4 p-4'>
            <div className=' text-sky-600 text-lg'>{error}</div>
            <div
              className='text-lg text-sky-600 decoration-double cursor-pointer hover:text-green-500'
              onClick={handleToLogin}
            >
              Registration
            </div>
          </div>
        )}
        <div className='overflow-x-auto overflow-y-auto w-full h-75vh'>
          {comments.map((item) => (
            <div key={item.id} className='pt-9 flex items-start gap-5'>
              <div className=''>
                <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                  {item.author.avatar ? (
                    <img
                      src={`http://localhost:8090/${item.author.avatar}`}
                      alt={item.author.avatar}
                    />
                  ) : (
                    <FaRegUserCircle />
                  )}
                </div>
              </div>
              <div className='flex-col'>
                <div className='flex items-center gap-4 pb-4'>
                  <div className='text-base font-robotoMedium'>
                    {item.author.name}
                  </div>
                  <div className='grey-add-text'>
                    {createDate(item.created_on)}
                  </div>
                </div>
                <div className='text-lg font-robotoMedium'>Комментарий</div>
                <div className='text-base'>{item.text} </div>
              </div>
            </div>
          ))}
        </div>
        <MobileMenu />
      </form>
    </div>
  )
}
