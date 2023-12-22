import { CardItem } from "components/card-item"
import { Search } from "components/search"
import { useAppDispatch } from "hooks/use-api"
import { filterAds } from "hooks/use-filter"
import { ContainerContent } from "layouts/container"
import { useEffect, useState } from "react"
import { Logo } from "shared/logos"
import { useGetAllAdsQuery } from "store/services"
import { getAllAds } from "store/slice"

export const MainPage = () => {
   const {data: allAds, isLoading} = useGetAllAdsQuery(100);
   const dispatch = useAppDispatch();

   const [searchTerm, setSearchTerm] = useState('');
   const [adsList, setAdsList] = useState(allAds);

   useEffect(() => {
      setAdsList(allAds)
      dispatch(getAllAds(allAds));
   }, [allAds]);

   useEffect(() => {
      const filteredCars = filterAds(searchTerm, allAds);
      setAdsList(filteredCars);
   }, [searchTerm, allAds])

   return (
      <ContainerContent>
         {isLoading
         ? <div>Loading...</div>
         :
         <div className="w-1440 mx-10">
            <div className="grid grid-cols-8">
               <div className="col-span-1">
                  <Logo />
               </div>
               <form className="col-span-7 flex gap-4">
                  <Search setSearchTerm={setSearchTerm} />
               </form>
            </div>

            <h2 className="mt-12 text-4xl">Объявления</h2>
               <CardItem
                  allAds={adsList} 
                  isLoading={isLoading}
               />
         </div>
         }

      </ContainerContent>
   )
}