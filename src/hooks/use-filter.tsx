import { IRequestAds } from 'interface/api-interface'

export const filterAds = (searchText: string, listOfAds: IRequestAds[]) => {
	if (!searchText) {
		return listOfAds
	}
	return listOfAds.filter(({ title }) =>
		title.toLowerCase().includes(searchText.toLowerCase()),
	)
}
