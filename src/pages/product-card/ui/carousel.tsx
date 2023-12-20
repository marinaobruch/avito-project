import { IImages } from "interface/api-interface";
import { FC, useState } from "react";

interface IProps {
    images: IImages[];
}

export const Carousel:FC<IProps> = ({ images }) => {
    console.log(images);

    const [currentImage, getCurrentImage] = useState<string>(
        images[0]
        ? `http://localhost:8090/${images[0].url}`
        : `https://voen-rubeg.ru/No_Image_Available.jpg`
        );

    const handleChoiceImage = (id: number) => {
        if(images[id]?.url !== undefined) {
            getCurrentImage(`http://localhost:8090/${images[id]?.url}`);
        }
        return;
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="h-480 w-480 bg-gray-200">
                <img
                className="h-480 w-480 object-cover"
                src={currentImage}
                alt={'img'}
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="carousel" onClick={() => handleChoiceImage(0)}>
                    {images[0] &&
                    <img className="h-20 w-20 object-cover"
                    src={`http://localhost:8090/${images[0].url}`}
                    alt=""
                    />} 
                </div>
                <div className="carousel" onClick={() => handleChoiceImage(1)}>
                    {images[1] &&
                    <img className="h-20 w-20 object-cover"
                    src={`http://localhost:8090/${images[1].url}`}
                    alt=""
                    />} 
                </div>
                <div className="carousel" onClick={() => handleChoiceImage(2)}>
                    {images[2] &&
                    <img className="h-20 w-20 object-cover"
                    src={`http://localhost:8090/${images[2].url}`}
                    alt=""
                    />} 
                </div>
                <div className="carousel" onClick={() => handleChoiceImage(3)}>
                    {images[3] &&
                    <img className="h-20 w-20 object-cover"
                    src={`http://localhost:8090/${images[3].url}`}
                    alt=""
                    />} 
                </div>
                <div className="carousel" onClick={() => handleChoiceImage(4)}>
                    {images[4] &&
                    <img className="h-20 w-20 object-cover"
                    src={`http://localhost:8090/${images[4].url}`}
                    alt=""
                    />} 
                </div>
            </div>
        </div>

    )
}