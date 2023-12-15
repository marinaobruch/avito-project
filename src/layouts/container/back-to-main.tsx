import { NavLink } from "react-router-dom"
import { ButtonMain } from "shared/buttons"
import { Logo } from "shared/logos"

export const BackToMainPage = () => {
    return (
        <div className="grid grid-cols-8 items-center">
        <div className="col-span-1">
           <Logo />
        </div>
        <div className="col-span-7">
          <NavLink to={'/main'}>
              <ButtonMain text="Вернуться на главную" width="240px" />
          </NavLink>
        </div>
     </div>
    )
}