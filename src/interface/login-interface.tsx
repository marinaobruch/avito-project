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
    sity?: string
}