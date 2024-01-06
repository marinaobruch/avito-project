import { IRequestAds } from 'interface/api-interface'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import { createDate, numberWithSpaces } from 'utils'

import { Puff } from 'react-loader-spinner'
import { NoPhotoBig } from 'shared/logos'

interface IProps {
	allAds: IRequestAds[] | undefined
	isLoading?: boolean
}

export const CardItem: FC<IProps> = ({ allAds, isLoading }) => {
	const navigate = useNavigate()

	return (
		<div>
			{isLoading ? (
				<div>
					<Puff
						visible={true}
						height='80'
						width='80'
						color='#0ea5e9'
						ariaLabel='puff-loading'
						wrapperStyle={{}}
						wrapperClass=''
					/>
				</div>
			) : (
				<div
					className='
                grid grid-cols-8 gap-6 mt-3 justify-items-center
                xl:grid-cols-9 lg:grid-cols-4 md:gap-4 lg:mb-24'
				>
					{allAds?.map((item) => (
						<div
							key={item.id}
							className='
                        col-span-2 hover:border-sky-500 p-1 default-hover hover:scale-105 easy-animation shadow-xl rounded-lg
                        xl:col-span-3 lg:col-span-2 xs:col-span-4'
							onClick={() => navigate(`/product/${item.id}`)}
						>
							<div className='w-72 h-72 md:w-52 md:h-52 sm:w-36 sm:h-36 bg-slate-200 cursor-pointer'>
								{item.images[0] ? (
									<img
										className='w-72 h-72 md:w-52 md:h-52 sm:w-36 sm:h-36 object-cover'
										src={`http://localhost:8090/${item.images[0].url}`}
										alt={item.title}
									/>
								) : (
									<NoPhotoBig />
								)}
							</div>
							<div className='text-2xl md:text-sm max-w-152 text-sky-500 cursor-pointer'>
								{item.title}
							</div>
							<div className='text-2xl md:text-base'>
								{numberWithSpaces(item.price)} ₽
							</div>
							<div className='text-lg md:text-xs text-gray-400'>
								{item.user.city}
							</div>
							<div className='text-lg md:text-xs text-gray-400'>
								{createDate(item.created_on)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
