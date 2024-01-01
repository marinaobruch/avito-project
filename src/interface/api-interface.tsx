// USER
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
export interface IUserPatch {
  name?: string,
  surname?: string,
  city?: string,
  phone?: string,
}
export interface IChangeForm {
  name: string;
  surname: string;
  city: string;
  phone: string;
}


//TOKENS
export interface IToken {
  access_token: string,
  refresh_token: string,
}


//ADS
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
export interface IBodyForPatchAd {
  title: string,
  description: string,
  price: number,
}
export interface IPatchAd {
  id: number;
  body: IBodyForPatchAd;
}


//IMAGES
export interface IImages {
  id: number;
  ad_id: number;
  url: string;
}
export interface IDeleteImgRequest {
  id: number;
  file_url: string | undefined;
}
export interface IImgResponse {
  ad_id: number;
  id: number;
  url: string;
}

export interface IPostImgInAdv {
  id: number;
  body: string | object;
}


//COMMENTS
export interface ICommemtRequest {
  id: number;
  text: string;
  create_on: string;
  author: IUserRequest;
}
export interface ICommentsRequest {
  author: IUserRequest,
  created_on: string,
  id: number,
  text: string,
}
export interface IComment {
  review: string;
}
export interface IPostComment {
  id: number;
  body: string;
}