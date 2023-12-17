import { Outlet, useNavigate } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';

export const LayoutNoAuth = () => {
  const navigate = useNavigate();
const handlerMoveToLogin = () => navigate('/login');

  return (
    <div className='pb-10'>
        <header className='bg-sky-500 flex items-center justify-end'>
             <nav className="h-20 flex items-center mr-11">
               <ButtonIn
                  text='Вход в личный кабинет'
                  onClick={handlerMoveToLogin}
               />             
            </nav>
            </header>
        <Outlet />
    </div>
  );
};