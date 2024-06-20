import { BackToMainPage, ContainerContent } from 'layouts/container'
import { MainMobileLayout } from 'layouts/layout'
import { useParams } from 'react-router-dom'
import { useGetAdByIdQuery } from 'store/services'
import { Carousel, MobileCarousel, ProductAdData, UserAdData } from './ui'

export const ProductCard = () => {
  const { id } = useParams()
  const toNumber = Number(id)

  const { data: adById } = useGetAdByIdQuery(toNumber)
  return (
    <ContainerContent>
      <MainMobileLayout>
        {adById && (
          <div>
            <div className='lg-min:mx-10'>
              <BackToMainPage />
              <div className='mt-10 mb-16'>
                <div className='w-full flex justify-start items-start gap-10 mt-20 lg:flex-col lg:items-center'>
                  <div className='sm:hidden'>
                    <Carousel images={adById.images} />
                  </div>
                  <div className='sm-min:hidden sm:mb-10'>
                    <MobileCarousel images={adById.images} />
                  </div>
                  <div className='w-full'>
                    <ProductAdData adById={adById} />
                    <UserAdData adById={adById} />
                  </div>
                </div>
                <div className='mt-16'>
                  <h3 className='text-4xl mb-8'>Описание товара</h3>
                  {adById?.description ? (
                    <div className='text-base max-w-792'>
                      {adById?.description}
                    </div>
                  ) : (
                    <div className='text-base max-w-792'>
                      Описание товара отсутствует
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </MainMobileLayout>
    </ContainerContent>
  )
}
