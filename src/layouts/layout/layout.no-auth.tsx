import { Outlet } from 'react-router-dom';
import { ButtonIn } from 'shared/buttons';

export const LayoutNoAuth = () => {

  return (
    <div>
        <header className='bg-blue-500 flex items-center justify-end'>
             <nav className="h-20 flex items-center mr-11">                    
                <ButtonIn text='Войти в личный кабинет' width={40} height={12}/>
            </nav>
            </header>

        <Outlet />
    </div>
  );
};