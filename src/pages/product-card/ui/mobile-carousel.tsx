import { IImages } from 'interface/api-interface'
import { FC } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface IProps {
	images: IImages[]
}

export const MobileCarousel: FC<IProps> = ({ images }) => {
	const navigate = useNavigate()
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	}

	return (
		<div className='w-80 h-80'>
			<div className='lg-min:hidden text-black' onClick={() => navigate(-1)}>
				<IoChevronBackOutline />
			</div>
			<Slider {...settings}>
				{images[0] ? (
					<img
						className='w-80 h-80 bg-gray-200 object-cover'
						src={`http://localhost:8090/${images[0].url}`}
						alt=''
					/>
				) : (
					<img
						className='w-80 h-80 bg-gray-200 object-cover'
						src='https://voen-rubeg.ru/No_Image_Available.jpg'
						alt=''
					/>
				)}
				{images[1] && (
					<img
						className='w-80 h-80 bg-gray-200 object-cover'
						src={`http://localhost:8090/${images[1].url}`}
						alt=''
					/>
				)}
				{images[2] && (
					<img
						className='w-80 h-80 bg-gray-200 object-cover'
						src={`http://localhost:8090/${images[2].url}`}
						alt=''
					/>
				)}
				{images[3] && (
					<img
						className='w-80 h-80 bg-gray-200 object-cover'
						src={`http://localhost:8090/${images[3].url}`}
						alt=''
					/>
				)}
				{images[4] && (
					<img
						className='w-80 h-80 bg-gray-200 object-cover'
						src={`http://localhost:8090/${images[4].url}`}
						alt=''
					/>
				)}
			</Slider>
		</div>
	)
}
