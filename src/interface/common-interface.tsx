import { IPostAdv } from ".";

export interface IChangeForm {
    name: string;
    surname: string;
    city: string;
    phone: string;
}

export interface IPatchAd {
    id: number;
    body: IPostAdv;
}

export interface IComment {
    review: string;
}