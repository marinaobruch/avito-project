import { FC } from 'react'
import { useNavigate } from 'react-router'
import { ButtonMain } from 'shared/buttons'
import { useDeleteAdvMutation } from 'store/index'

interface IProps {
  setOpenModalDelete: (arg: boolean) => void
  adId: number
}

export const ModalCardDelete: FC<IProps> = ({ setOpenModalDelete, adId }) => {
  const [deleteAd] = useDeleteAdvMutation()
  const navigate = useNavigate()

  const handleDeleteAd = () => {
    deleteAd(adId).then((res) => console.log(res))
    navigate('/')
  }
  return (
    <div
      onClick={() => setOpenModalDelete(false)}
      className='w-full h-full fixed left-0 top-0 bg-gray-800/75 z-10 flex flex-col items-center justify-center'
    >
      <div
        className='w-96 h-60 bg-slate-200 rounded-2xl flex-col items-center justify-evenly'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-2xl text-sky-600 p-8'>
          Вы действительно хотите удалить пост?
        </h1>
        <div className='flex items-center justify-center gap-4'>
          <ButtonMain
            text='Да'
            width='w-32'
            onClick={handleDeleteAd}
            type='submit'
          />
          <ButtonMain
            text='Нет'
            width='w-32'
            onClick={() => setOpenModalDelete(false)}
            type='submit'
          />
        </div>
      </div>
    </div>
  )
}
