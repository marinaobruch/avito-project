import { Outlet } from 'react-router-dom'
import { Logo } from 'shared/logos'

export const LayoutMobile = () => {
	return (
		<div className='lg-min:hidden fixed right-0 top-0 h-14 w-full'>
			<header className='bg-sky-500 flex items-center justify-start pl-6'>
				<nav className='h-20 flex gap-2 justify-center items-center mr-11'>
					<div className='lg-min:hidden'>
						<Logo />
					</div>
				</nav>
			</header>
			<Outlet />
		</div>
	)
}
