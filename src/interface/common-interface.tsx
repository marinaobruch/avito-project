export interface IChangeForm {
    name: string;
    surname: string;
    city: string;
    phone: string;
}

export interface IAddNewAd {
    title: string;
    description: string;
    photo1?: string;
    photo2?: string;
    photo3?: string;
    photo4?: string;
    photo5?: string;
    price: number;
}

export interface IPatchAd {
    id: number;
    body: IAddNewAd;
}

export interface IComment {
    review: string;
}