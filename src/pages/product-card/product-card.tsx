import { BackToMainPage, ContainerContent } from "layouts/container"
import { useParams } from "react-router-dom"
import { useGetAdByIdQuery } from "store/services";
import { Carousel, ProductAdData, UserAdData } from "./ui";

// const mode:string = 'user'
const mode: string = 'creator'

export const ProductCard = () => {
    const { id } = useParams();
    const toNumber = Number(id);

    const { data: adById } = useGetAdByIdQuery(toNumber);

    return (
        <ContainerContent>
        {adById &&
        <div>
        <div className="w-1440 mx-10">
           <BackToMainPage />

            <div className="mt-10 mb-16">
                <div className="flex justify-start items-start gap-10 mt-20">

                    <Carousel images={adById.images} />
                    <div>
                        <ProductAdData mode={mode} adById={adById}/>
                        <UserAdData adById={adById}/>
                    </div>
                </div>
                <div className="mt-16">
                    <h3 className="text-4xl mb-8">Описание товара</h3>
                    {adById?.description
                    ? <div className="text-base max-w-792">{adById?.description}</div>
                    : <div className="text-base max-w-792">Описание товара отсутствует</div>
                    }
                </div>   
            </div>
        </div>


            </div>
        }

     </ContainerContent>
    )
}