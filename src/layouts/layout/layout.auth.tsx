import { NavLink, Outlet } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';

export const LayoutAuth = () => {

  return (
    <div className='pb-10'>
        <header className='bg-sky-500 flex items-center justify-end'>
             <nav className="h-20 flex gap-2 justify-center items-center mr-11">               
                  <ButtonIn text='Разместить объявление'/>
                  <NavLink to={'/profile'} >
                    <ButtonIn text='Личный кабинет'/>
                  </NavLink>
            </nav>
            </header>

        <Outlet />
    </div>
  );
};