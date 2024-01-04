import { CardItem } from "components/card-item"
import { Search } from "components/search"
import { useAppDispatch } from "hooks/use-api"
import { filterAds } from "hooks/use-filter"
import { ContainerContent } from "layouts/container"
import { useEffect, useState } from "react"
import { Logo } from "shared/logos"
import { useGetAllAdsQuery } from "store/services"
import { getAllAds } from "store/slice"

import {Puff} from 'react-loader-spinner';
import { MainMobileLayout, } from "layouts/layout"


export const MainPage = () => {
   const {data: allAds, isLoading} = useGetAllAdsQuery(100);
   const dispatch = useAppDispatch();

   const [searchTerm, setSearchTerm] = useState('');
   const [adsList, setAdsList] = useState(allAds);

   useEffect(() => {
      setAdsList(allAds);
      if(allAds) {
         dispatch(getAllAds(allAds));
      }
   }, [allAds]);

   useEffect(() => {
      if(allAds) {
         const filteredCars = filterAds(searchTerm, allAds);
         setAdsList(filteredCars);
      }
   }, [searchTerm, allAds])

   return (
      <ContainerContent>
         <MainMobileLayout>
            {isLoading
            ? <div>
               <Puff
                  visible={true}
                  height="80"
                  width="80"
                  color="#0ea5e9"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
               />
            </div>
            :
            <div className="mx-10">
               <div className="grid grid-cols-8">
                  <div className="col-span-1 lg:hidden">
                     <Logo />
                  </div>
                  <form className="col-span-7 flex gap-4 lg:fixed lg:top-5 sm:pl-10 lg:w-3/4">
                     <Search setSearchTerm={setSearchTerm} />
                  </form>
               </div>

               <h2 className="mt-12 text-4xl pl-4 lg:text-xl lg:pl-6">Объявления</h2>
                  <CardItem
                     allAds={adsList} 
                     isLoading={isLoading}
                  />
            </div>
            }
            </MainMobileLayout>
      </ContainerContent>
   )
}