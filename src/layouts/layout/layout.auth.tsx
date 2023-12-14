import { Outlet } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';

export const LayoutAuth = () => {

  return (
    <div>
        <header className='bg-blue-500 flex items-center justify-end'>
             <nav className="h-20 flex gap-2 justify-center items-center mr-11">               
                  <ButtonIn text='Разместить объявление'/>
                  <ButtonIn text='Вход в личный кабинет'/>
            </nav>
            </header>

        <Outlet />
    </div>
  );
};