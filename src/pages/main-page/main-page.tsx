import { Search } from "components/search"
import { ContainerContent } from "layouts/container"
import { ButtonMain } from "shared/buttons"
import { Logo } from "shared/logos"

export const MainPage = () => {
   return (
         <ContainerContent>
            <div className="flex justify-around">
               <Logo />
               <form className="flex items-center gap-4">
                  <Search />
                  <ButtonMain text="Найти" />
               </form>
         </div>
      </ContainerContent>
 )
}