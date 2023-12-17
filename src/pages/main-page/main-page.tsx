import { CardItem } from "components/card-item"
import { Search } from "components/search"
import { ContainerContent } from "layouts/container"
import { ButtonMain } from "shared/buttons"
import { Logo } from "shared/logos"

export const MainPage = () => {
   const handleSearch = () => console.log("Searching");

   return (
      <ContainerContent>
         <div className="w-1440 mx-10">
            <div className="grid grid-cols-8">
               <div className="col-span-1">
                  <Logo />
               </div>
               <form className="col-span-7 flex gap-4">
                  <Search />
                  <ButtonMain
                     type="button"
                     onClick={handleSearch}
                     text="Найти"
                     width="158px"
                  />
               </form>
            </div>

            <h2 className="mt-12 text-4xl">Объявления</h2>
               <CardItem />
         </div>
      </ContainerContent>
 )
}