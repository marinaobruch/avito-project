import { FC } from 'react'

interface IProps {
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const Search: FC<IProps> = ({ setSearchTerm }) => {
	const handleSearch = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.KeyboardEvent<HTMLInputElement>,
	) => {
		setSearchTerm(event.currentTarget.value)
	}

	return (
		<input
			onKeyDown={handleSearch}
			type='text'
			placeholder='Поиск...'
			className='h-12 w-full rounded-lg border-solid border-2 border-gray-200 p-5 text-sm text-gray-800 mr-4 xs:mr-8'
		/>
	)
}
