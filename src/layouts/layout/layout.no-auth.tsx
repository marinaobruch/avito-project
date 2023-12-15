import { NavLink, Outlet } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';

export const LayoutNoAuth = () => {

  return (
    <div className='pb-10'>
        <header className='bg-sky-500 flex items-center justify-end'>
             <nav className="h-20 flex items-center mr-11">
              <NavLink to={'/login'}>
               <ButtonIn text='Вход в личный кабинет'/>
              </NavLink>               
                
            </nav>
            </header>
        <Outlet />
    </div>
  );
};