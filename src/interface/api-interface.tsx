export interface IUserReg {
  email: string,
  password: string,
  passwordRepeat?: string,
  name?: string,
  surname?: string,
  city?: string,
}

export interface IUserLogin {
  email: string,
  password: string,
}

export interface IUserImgPost {
  file: string,
}

export interface IUserPatch {
  name?: string,
  surname?: string,
  city?: string,
  phone?: string,
}

export interface IUserRequest {
    id: number;
    name: string;
    email: string;
    city?: string;
    avatar?: string;
    sells_from?: string;
    phone?: string;
    role?: string;
    surname?: string;
  }

  export interface ICommentsRequest {
    author: IUserRequest,
    created_on: string,
    id: number,
    text: string,
  }

  export interface IImages {
    id: number;
    ad_id: number;
    url: string;
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

  export interface IPostAdv {
    title: string,
    description: string,
    photo1?: string,
    photo2?: string,
    photo3?: string,
    photo4?: string,
    photo5?: string,
    price: number,
  }
