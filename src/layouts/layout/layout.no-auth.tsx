import { useAppSelector } from 'hooks/use-api'
import { Outlet, useNavigate } from 'react-router-dom'
import { ButtonIn } from 'shared/buttons'

export const LayoutNoAuth = () => {
	const navigate = useNavigate()
	const currentUser = useAppSelector((state) => state.user.email)

	const handleMoveToLogin = () => navigate('/login')
	const handlerMoveToProfile = () => navigate('/profile')

	return (
		<div className='pb-10'>
			<header className='bg-sky-500 flex items-center justify-end'>
				<nav className='h-20 flex items-center lg:hidden'>
					{!currentUser ? (
						<ButtonIn
							text='Вход в личный кабинет'
							onClick={handleMoveToLogin}
						/>
					) : (
						<nav className='h-20 flex gap-2 justify-center items-center mr-11'>
							<ButtonIn text='Личный кабинет' onClick={handlerMoveToProfile} />
						</nav>
					)}
				</nav>
			</header>
			<Outlet />
		</div>
	)
}
