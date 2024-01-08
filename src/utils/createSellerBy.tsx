export const createSellerBy = (data: string) => {
	const date = new Date(data)

	const formatMonth = (data: number) => {
		if (data === 1) {
			return 'января'
		} else if (data === 2) {
			return 'февраля'
		} else if (data === 3) {
			return 'марта'
		} else if (data === 4) {
			return 'апреля'
		} else if (data === 5) {
			return 'мая'
		} else if (data === 6) {
			return 'июня'
		} else if (data === 7) {
			return 'июля'
		} else if (data === 8) {
			return 'августа'
		} else if (data === 9) {
			return 'сентября'
		} else if (data === 10) {
			return 'октября'
		} else if (data === 11) {
			return 'ноября'
		} else if (data === 12) {
			return 'декабря'
		}
	}

	const month = formatMonth(date.getMonth() + 1)
	const year = date.getFullYear()

	const formatNearDate = month + ' ' + year

	return formatNearDate
}
