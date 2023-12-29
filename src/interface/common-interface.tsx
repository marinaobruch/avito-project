export interface IChangeForm {
    name: string;
    surname: string;
    city: string;
    phone: string;
}

export interface IBodyForPatchAd {
    title: string,
    description: string,
    price: number,
}

export interface IPatchAd {
    id: number;
    body: IBodyForPatchAd;
}


export interface IComment {
    review: string;
}