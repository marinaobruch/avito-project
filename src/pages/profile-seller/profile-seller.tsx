import { CardItem } from 'components/card-item'
import { useAppSelector } from 'hooks/use-api'
import { BackToMainPage, ContainerContent } from 'layouts/container'
import { MainMobileLayout } from 'layouts/layout'
import { useEffect, useState } from 'react'
import { ButtonMain } from 'shared/buttons'
import { NoPhotoBig } from 'shared/logos'
import { useGetAdByUserIdQuery } from 'store/index'
import { CreateHideNumber } from 'utils/createHideNumber'
import { createSellerBy } from 'utils/createSellerBy'

import { IoChevronBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router'

export const ProfileSeller = () => {
  const userData = useAppSelector((state) => state.profile.choisenUser)
  const { data: getAdsByUserId, isLoading } = useGetAdByUserIdQuery(userData.id)
  const [hideNumber, setHideNumber] = useState<boolean>(false)
  const [sellTime, setSellTime] = useState<string>('')
  const navigate = useNavigate()

  const phoneNumber: string | undefined = userData?.phone
  const phoneNumberHide = CreateHideNumber(phoneNumber)
  const periodOfSales: string = createSellerBy(sellTime)

  useEffect(() => {
    if (userData.sells_from) setSellTime(userData.sells_from)
  }, [userData])

  const handleShowNumber = () => setHideNumber((prev) => !prev)
  const backToProfile = () => {
    navigate(-1)
  }

  return (
    <ContainerContent>
      <MainMobileLayout>
        <div className='mx-10'>
          <BackToMainPage />
          <div className='mt-16 lg:flex lg:items-center lg:text-2xl lg:gap-4'>
            <div className='lg-min:hidden' onClick={backToProfile}>
              <IoChevronBackOutline />
            </div>
            <h2 className='text-4xl lg:text-2xl'>Профиль продавца</h2>
          </div>
          <div className='mt-10 mb-16'>
            <div className='flex justify-start items-start gap-10 mt-10 sm:flex-col sm:justify-center sm:items-center'>
              <div className='flex flex-col items-center'>
                <div className='bg-gray-200 w-44 h-44 rounded-full mb-4'>
                  {userData.avatar ? (
                    <img
                      className='w-44 h-44 object-cover'
                      src={`http://localhost:8090/${userData.avatar}`}
                    />
                  ) : (
                    <NoPhotoBig />
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <div className='text-xl'>{userData.name}</div>
                <div className='text-base text-gray-500'>{userData.city}</div>
                <div className='text-base text-gray-500'>
                  Продает товары с {periodOfSales}
                </div>
                <ButtonMain
                  type='button'
                  onClick={handleShowNumber}
                  text={hideNumber ? phoneNumber : phoneNumberHide}
                  width='w-full'
                />
              </div>
            </div>
          </div>

          <h3 className='mt-12 text-4xl pl-4 lg:text-xl lg:pl-6'>
            Товары продавца
          </h3>
          <CardItem allAds={getAdsByUserId} isLoading={isLoading} />
        </div>
      </MainMobileLayout>
    </ContainerContent>
  )
}
