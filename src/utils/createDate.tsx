export const createDate = (data: string) => {
	const date = new Date(data)

	const now = new Date()
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	const yesterday = new Date(today.valueOf() - 86400000)
	const adDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

	const formatedData = (data: number) => {
		if (data < 10) {
			return '0' + data
		} else return data
	}

	const formatMonth = (data: number) => {
		if (data === 1) {
			return 'янв.'
		} else if (data === 2) {
			return 'фев'
		} else if (data === 3) {
			return 'март'
		} else if (data === 4) {
			return 'апр.'
		} else if (data === 5) {
			return 'май'
		} else if (data === 6) {
			return 'июнь'
		} else if (data === 7) {
			return 'июль'
		} else if (data === 8) {
			return 'авг.'
		} else if (data === 9) {
			return 'сент.'
		} else if (data === 10) {
			return 'окт.'
		} else if (data === 11) {
			return 'нояб.'
		} else if (data === 12) {
			return 'дек.'
		}
	}

	const hours = formatedData(date.getHours())
	const minutes = formatedData(date.getMinutes())
	const day = formatedData(date.getDate())
	const month = formatMonth(date.getMonth() + 1)
	const year = date.getFullYear()

	const formatNearDate = () => {
		if (adDate < yesterday) {
			return day + ' ' + month + ' ' + year + ' в ' + hours + ':' + minutes
		} else if (adDate < today) {
			return 'Вчера' + ' в ' + hours + ':' + minutes
		} else {
			return 'Сегодня' + ' в ' + hours + ':' + minutes
		}
	}

	const formattedDate = formatNearDate()

	return formattedDate
}
