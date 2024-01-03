import Home from './../../assets/icons/home.svg'
import Add from './../../assets/icons/add.svg'
import Profile from './../../assets/icons/profile.svg'


export const MobileMenu = () => {
    return (
        <div className='sm-min:hidden bg-white fixed right-0 bottom-0 h-14 w-full shadow-inner'>
            <div className='flex items-center justify-evenly py-1'>
                <div>
                    <img src={`${Home}`} alt="Home-png"/>
                </div>
                <div>
                    <img src={`${Add}`} alt="Add-png"/>
                </div>
                <div>
                    <img src={`${Profile}`} alt="Profile-png"/>
                </div>
            </div>
        </div>
    )
}