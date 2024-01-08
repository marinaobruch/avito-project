import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { PiSmileySadThin } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

export const NotFoundPage = () => {
	return (
		<div className='h-64 relative p-28 lg:p-10 md:p-5 xs:p-1'>
			<div className='absolute top-96 flex flex-col xs:items-center gap-20'>
				<div className=' flex justify-evenly items-center gap-8'>
					<h1 className='text-9xl lg:text-7xl md:text-4xl xs:text-base text-sky-500'>PAGE NOT FOUND</h1>
					<div className='text-9xl lg:text-7xl md:text-4xl xs:hidden text-sky-500'>
						<PiSmileySadThin />
					</div>
				</div>
				<div className='flex xs:flex-col justify-start items-center gap-2'>
					<div className='text-3xl lg:text-2xl md:text-lg xs:text-base'>Register and try again!</div>
					<MdKeyboardDoubleArrowRight />
					<NavLink to={'/register'}>
						<div className='text-3xl lg:text-2xl md:text-lg xs:text-base hover:text-green-500 hover:underline active:text-green-800'>
							GO TO REGISTER
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	)
}
