import { CardItem } from 'components/card-item'
import { useAppDispatch, useAppSelector } from 'hooks/use-api'
import { BackToMainPage, ContainerContent } from 'layouts/container'
import { useEffect, useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ButtonMain, ButtonMainDisabled } from 'shared/buttons'
import { InputContentNotNess } from 'shared/inputs'
import {
  useGetCurrentUserQuery,
  useGetUserAdsQuery,
  usePatchUserMutation,
} from 'store/services'
import { removeUser, setUserData } from 'store/slice'
import { UserAvatar } from '.'

import { IChangeForm } from 'interface/api-interface'
import { MainMobileLayout } from 'layouts/layout'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const form = useId()

  const [patchUser] = usePatchUserMutation()
  const { data: getUser } = useGetCurrentUserQuery('')
  const { data: getUserAds, isLoading: isLoadingAdsUser } =
    useGetUserAdsQuery('')
  const { data: currentUser, isLoading: isLoadingСurrentUser } =
    useGetCurrentUserQuery('')

  useEffect(() => {
    if (currentUser) dispatch(setUserData(currentUser))
  }, [currentUser, getUser])

  const cashUser = useAppSelector((state) => state.user.userData)

  const { handleSubmit, control, watch } = useForm<IChangeForm>({
    mode: 'onChange',
    defaultValues: {
      name: cashUser?.name ? cashUser?.name : '',
      surname: cashUser?.surname ? cashUser?.surname : '',
      city: cashUser?.city ? cashUser?.city : '',
      phone: cashUser?.phone ? cashUser?.phone : '',
    },
  })

  const name = watch('name')
  const surname = watch('surname')
  const city = watch('city')
  const phone = watch('phone')

  const isValid =
    name !== cashUser?.name ||
    surname !== cashUser?.surname ||
    city !== cashUser?.city ||
    phone !== cashUser?.phone

  const handleChange: SubmitHandler<IChangeForm> = (data) => {
    patchUser(data).then((res) => {
      if ('data' in res) {
        console.log(res.data)
        dispatch(setUserData(res.data))
      }
      console.log(res)
    })
  }

  const handleLogout = () => {
    dispatch(removeUser())
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    navigate('/login')
    window.location.reload()
  }

  return (
    <ContainerContent>
      <MainMobileLayout>
        <div className='mx-10'>
          <BackToMainPage />
          {isLoadingСurrentUser ? (
            <div>
              <Puff
                visible={true}
                height='80'
                width='80'
                color='#0ea5e9'
                ariaLabel='puff-loading'
                wrapperStyle={{}}
                wrapperClass=''
              />
            </div>
          ) : (
            <div className='w-full'>
              <h2 className='mt-16 text-4xl'>
                Здравствуйте, {currentUser?.email} !
              </h2>
              <div className='mt-10 mb-16'>
                <h3 className='text-3xl'>Настройки профиля</h3>
                <div
                  className='flex justify-start items-start gap-10 mt-10
                  lg:flex-col lg:justify-center lg:items-center'
                >
                  <UserAvatar getUser={getUser} />

                  <form
                    id={form}
                    onSubmit={handleSubmit(handleChange)}
                    className='grid grid-cols-2 gap-4 lg:w-full'
                  >
                    <div className='col-span-2 flex gap-4 lg:flex-col'>
                      <div className='col-span-1'>
                        <label className='grey-add-text p-2 lg:pl-6'>Имя</label>
                        <InputContentNotNess
                          control={control}
                          name='name'
                          placeholder='Имя'
                          type='text'
                          width='100%'
                        />
                      </div>
                      <div className='col-span-1'>
                        <label className='grey-add-text p-2 lg:pl-6'>
                          Фамилия
                        </label>
                        <InputContentNotNess
                          control={control}
                          name='surname'
                          placeholder='Фамилия'
                          type='text'
                          width='100%'
                        />
                      </div>
                    </div>

                    <div className='col-span-2'>
                      <label className='grey-add-text p-2 lg:pl-6'>Город</label>
                      <InputContentNotNess
                        control={control}
                        name='city'
                        placeholder='Город'
                        type='text'
                        width='100%'
                      />
                    </div>

                    <div className='col-span-2'>
                      <label className='grey-add-text p-2 lg:pl-6'>Номер</label>
                      <InputContentNotNess
                        control={control}
                        name='phone'
                        placeholder='Номер'
                        type='number'
                        width='100%'
                      />
                    </div>

                    <div
                      className='col-span-2 flex justify-between
                      lg:flex-col lg:gap-4 lg-min:gap-10'
                    >
                      <ButtonMainDisabled
                        type='submit'
                        text='Сохранить'
                        width='w-full'
                        disabled={isValid}
                      />
                      <ButtonMain
                        onClick={handleLogout}
                        type='submit'
                        text='Выход'
                        width='w-full'
                      />
                    </div>
                  </form>
                </div>
              </div>
              <h3 className='text-3xl'>Мои товары</h3>
              <div>
                {getUserAds
                  ? getUserAds?.length <= 0 && (
                      <div className='text-base pt-4'>Товаров нет</div>
                    )
                  : ''}
                <CardItem allAds={getUserAds} isLoading={isLoadingAdsUser} />
              </div>
            </div>
          )}
        </div>
      </MainMobileLayout>
    </ContainerContent>
  )
}
