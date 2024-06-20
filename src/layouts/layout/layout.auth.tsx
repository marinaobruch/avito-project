import { AddNewAd } from 'components/modal'
import { useAppSelector } from 'hooks/use-api'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ButtonIn } from 'shared/buttons'

export const LayoutAuth = () => {
  const [openNewAd, setOpenNewAd] = useState<boolean>(false)

  const userEmail = useAppSelector((state) => state.user.email)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const switchOpenNewAd = () => setOpenNewAd(true)
  const handlerMoveToProfile = () => navigate('/profile')

  return (
    <div className='pb-10'>
      <header className='bg-sky-500 flex items-center justify-end'>
        <nav className='h-20 flex gap-2 justify-center items-center mr-11 lg:hidden'>
          {userEmail && (
            <div className='flex gap-2'>
              <ButtonIn
                text='Разместить объявление'
                onClick={switchOpenNewAd}
              />
              {pathname === '/profile' ? null : (
                <ButtonIn
                  text='Личный кабинет'
                  onClick={handlerMoveToProfile}
                />
              )}
            </div>
          )}
        </nav>
      </header>
      <Outlet />
      {openNewAd && <AddNewAd setOpenNewAd={setOpenNewAd} />}
    </div>
  )
}
