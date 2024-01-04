import { FC, ReactNode } from "react";
import { LayoutMobile, MobileMenu } from ".";

interface IContainerProps {
    children: ReactNode;
  }

export const MainMobileLayout: FC<IContainerProps> = ({ children }) => {
    return (
        <div className="">
            <LayoutMobile />
                { children }
            <MobileMenu />
        </div>
    )
}