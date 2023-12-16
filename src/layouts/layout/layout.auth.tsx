import { AddNewAd } from 'components/new-add';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';

export const LayoutAuth = () => {
const [openNewAd, setOpenNewAd] = useState<boolean>(false);
const navigate = useNavigate();

const switchOpenNewAd = () => setOpenNewAd(true);
const handlerMoveToProfile = () => navigate('/profile');

  return (
    <div className='pb-10'>
        <header className='bg-sky-500 flex items-center justify-end'>
             <nav className="h-20 flex gap-2 justify-center items-center mr-11">               
                  <ButtonIn
                    text='Разместить объявление'
                    onClick={switchOpenNewAd}
                  />
                  {openNewAd && 
                    <AddNewAd
                      setOpenNewAd={setOpenNewAd}
                    />}
                  <ButtonIn
                    text='Личный кабинет'
                    onClick={handlerMoveToProfile}
                  />
            </nav>
            </header>
        <Outlet />
    </div>
  );
};