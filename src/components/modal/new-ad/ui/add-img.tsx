import { FC } from 'react'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { PiPlusThin } from 'react-icons/pi'

interface IProps {
	idIndex: number
	currentImg: object[]
	setCurrentImg: (value: React.SetStateAction<object[]>) => void
}

export const AddImgInModal: FC<IProps> = ({
	idIndex,
	currentImg,
	setCurrentImg,
}) => {
	const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		const file = event.target.files?.[0]
		if (file) {
			const formData = new FormData()
			if (file) {
				formData.append('file', file)
				console.log(file)
				setCurrentImg((currentImg) => [...currentImg, formData])
			}
		}
	}

	return (
		<div>
			<input
				className='hidden'
				type='file'
				id={`file_${idIndex}`}
				onChange={handleImgUpload}
			/>
			<label className='label-img' htmlFor={`file_${idIndex}`}>
				{currentImg.length > idIndex ? (
					<div className='text-green-500'>
						<IoCheckmarkDoneCircleOutline />
					</div>
				) : (
					<PiPlusThin />
				)}
			</label>
		</div>
	)
}
