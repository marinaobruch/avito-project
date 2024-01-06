import { IRequestAds } from 'interface/api-interface'
import { FC, useState } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { PiPlusThin } from 'react-icons/pi'
import { usePostImgInAdvMutation } from 'store/index'
import { ModalImgDelete } from './delete-img'

interface IProps {
	adById: IRequestAds
	indexImg: number
}

export const ChangeImgImModal: FC<IProps> = ({ adById, indexImg }) => {
	const [postImg] = usePostImgInAdvMutation()

	const [imgForDelete, setImgForDelete] = useState<string>('')
	const [deleteModal, setDeleteModal] = useState<boolean>(false)

	const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		const file = event.target.files?.[0]
		if (file) {
			const formData = new FormData()
			if (file) {
				formData.append('file', file)
				postImg({ id: adById.id, body: formData }).then((data) =>
					console.log(data),
				)
			}
		}
	}

	const handleClickToDeleteImg = (
		e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLSpanElement>,
		urlId: string,
	) => {
		console.log(urlId)
		e.stopPropagation()
		setDeleteModal(true)
		setImgForDelete(urlId)
	}

	return (
		<div>
			<input
				className='hidden'
				type='file'
				id={`file_${indexImg}`}
				onChange={handleImgUpload}
			/>
			{adById.images[indexImg] ? (
				<div className='relative w-24 h-24'>
					<span
						onClick={(e) =>
							handleClickToDeleteImg(e, adById.images[indexImg].url)
						}
						className='delete-img'
					>
						<MdOutlineDeleteOutline />
					</span>
					<label
						onClick={(e) => e.preventDefault()}
						className='w-24 h-24 bg-gray-200'
						htmlFor={`file_${indexImg}`}
					>
						<img
							className='w-24 h-24 object-cover p-1 bg-gray-100'
							src={`http://localhost:8090/${adById.images[indexImg]?.url}`}
							alt=''
						/>
					</label>
					{deleteModal && (
						<ModalImgDelete
							setOpenModalDelete={setDeleteModal}
							adId={adById.id}
							file_url={imgForDelete}
						/>
					)}
				</div>
			) : (
				<label className='label-img' htmlFor='file_1'>
					<PiPlusThin />
				</label>
			)}
		</div>
	)
}
