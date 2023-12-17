import {useNavigate } from "react-router-dom"
import { ButtonMain } from "shared/buttons"
import { Logo } from "shared/logos"

export const BackToMainPage = () => {
    const navigate = useNavigate();

    const handleToGoMain = () => navigate('/main')

    return (
        <div className="grid grid-cols-8 items-center">
        <div className="col-span-1">
           <Logo />
        </div>
        <div className="col-span-7">
              <ButtonMain
                type="button"
                onClick={handleToGoMain}
                text="Вернуться на главную"
                width="240px"
              />
        </div>
     </div>
    )
}