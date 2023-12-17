export interface IUser {
    id: number | null;
    name?: string | null;
    password?: string | null;
    passwordRepeat?: string | null;
    email: string | null;
    city?: string | null;
    avatar?: string | null;
    sells_from?: string | null;
    phone?: string | null;
    role?: string | null;
    surname?: string | null;
}

export interface IUserRequest {
    id: number;
    name: string;
    email: string;
    city: string;
    avatar: string;
    sells_from: string;
    phone: string;
  }

  export interface IImages {
    id: number;
    ad_id: number;
    url: string
  }


  export interface IRequestAds {
        title: string;
        description: string;
        price: number;
        id: number;
        images: IImages[];
        user_id: number;
        created_on: string;
        user: IUserRequest;
  }