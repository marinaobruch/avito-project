export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegRequest {
    email: string;
    password: string;
    passwordRepeat: string;
    name?: string;
    surname?: string;
    city?: string
}

export interface IChangeForm {
    name: string;
    surname: string;
    city: string;
    number: string;
}

export interface IAddNewAd {
    name: string;
    description: string;
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
    photo5: string;
    price: string;
}