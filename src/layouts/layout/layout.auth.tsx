
import { AddNewAd } from 'components/modal';
import { useAppDispatch, useAppSelector } from 'hooks/use-api';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';
import { removeUser } from 'store/slice';

export const LayoutAuth = () => {
const [openNewAd, setOpenNewAd] = useState<boolean>(false);

const dispatch = useAppDispatch();
const userEmail = useAppSelector((state) => state.user.email);
const navigate = useNavigate();
const { pathname } = useLocation();

const switchOpenNewAd = () => setOpenNewAd(true);
const handlerMoveToProfile = () => navigate('/profile');
const handleLogout = () => {
  dispatch(removeUser());
  navigate('/login');
}

  return (
    <div className='pb-10'>
        <header className='bg-sky-500 flex items-center justify-end'>
          <nav className="h-20 flex gap-2 justify-center items-center mr-11"> 
          {userEmail &&
            <div className='flex gap-2'>             
              <ButtonIn
                text='Разместить объявление'
                onClick={switchOpenNewAd}
              />
              {pathname === '/profile'
              ? <ButtonIn
                  text='Выход'
                  onClick={handleLogout}
                />
              : <ButtonIn
                  text='Личный кабинет'
                  onClick={handlerMoveToProfile}
                />
              }
            </div>
          }
              </nav>
            </header>
        <Outlet />
        {openNewAd && 
        <AddNewAd setOpenNewAd={setOpenNewAd}
        />}
    </div>
  );
};