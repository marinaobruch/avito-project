import Home from './../../assets/icons/home.svg'
import Add from './../../assets/icons/add.svg'
import Profile from './../../assets/icons/profile.svg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { AddNewAd, ModalWarning } from 'components/modal'
import { useAppSelector } from 'hooks/use-api'


export const MobileMenu = () => {
const currentUser = useAppSelector((state) => state.user.email)
const [openNewAd, setOpenNewAd] = useState<boolean>(false);
const [warning, setWarning] = useState<boolean>(false);

console.log(currentUser);

const switchOpenNewAd = () => {
    if(currentUser) {
        setOpenNewAd(true)
        return
    }
    setWarning(true)
}

    return (
        <div className='lg-min:hidden bg-white fixed right-0 bottom-0 h-14 w-full shadow-inner'>
            <div className='flex items-center justify-evenly py-1'>
                <div>
                    <NavLink to={'/'}>
                        <img src={`${Home}`} alt="Home-png"/>
                    </NavLink>
                </div>
                <div onClick={switchOpenNewAd} className='cursor-pointer'>
                    <img src={`${Add}`} alt="Add-png"/>
                </div>
                <div>
                    <NavLink to={'/profile'}>
                        <img src={`${Profile}`} alt="Profile-png"/>
                    </NavLink>
                </div>
            </div>
            {openNewAd && 
                <AddNewAd setOpenNewAd={setOpenNewAd}
            />}
            {warning &&
                <ModalWarning
                    text='Пожалуйста, зарегистрируйтесь!'
                    setWarning={setWarning}
            />

            }
        </div>
    )
}