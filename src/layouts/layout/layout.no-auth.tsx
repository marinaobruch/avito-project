import {useAppDispatch, useAppSelector } from 'hooks/use-api';
import { Outlet, useNavigate } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';
import { removeUser } from 'store/slice';

export const LayoutNoAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.email);

  
  const handleMoveToLogin = () => navigate('/login');
  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  }

  return (
    <div className='pb-10'>
        <header className='bg-sky-500 flex items-center justify-end'>
             <nav className="h-20 flex items-center mr-11">
              {!currentUser
              ?<ButtonIn
              text='Вход в личный кабинет'
              onClick={handleMoveToLogin}
           />
              :<ButtonIn
              text='Выйти'
              onClick={handleLogout}
           /> 
              }      
            </nav>
            </header>
        <Outlet />
    </div>
  );
};