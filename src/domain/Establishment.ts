import { IOAuth2Token } from './Application'

export interface IChain {
  id: number;
  legacyId: number;
  name: string;
  cssColor?: string;
  logotype?: string;
  smallLogotype?: string;
  website?: string;
  status: number;
  createdOn: Date;
  updatedOn: Date;
}

export interface IBrand {
  id: number;
  legacyId: number;
  chainId: number;
  name: string;
  cssColor?: string;
  logotype?: string;
  smallLogotype?: string;
  website?: string;
  status: number;
  createdOn: Date;
  updatedOn: Date;
}

export interface IEstablishment {
  id: number;
  legacyId: number;
  brandId: number;
  name: string;
  description: string;
  cssColor?: string;
  logotype?: string;
  smallLogotype?: string;
  coordinate: string;
  mainAddress: string;
  gmt: string;
  category: string;
  stars: number;
  allowedCurrencies: string;
  totalRooms: number;
  mainPhone: string;
  languages: string;
  tourOperators?: string;
  website?: string;
  rrss?: string;
  status: number;
  createdOn: Date;
  updatedOn: Date;
  type: string; // "hotel", "complejo"
  loginType: string; // "autologin", "palladium", "apaleo"
  loginExternalCode?: string;
  loginForm: Object;
  pmsProvider: string; // Apaleo, Impala, Palladium...
  pmsExternalId: string; // For element search on updates
  pmsApaleoAccessToken?: IOAuth2Token;
  pmsMewsClientToken?: string;
  pmsMewsAccessToken?: string;
}

export interface IHotel {
  id: number;
  hotelId: number;
  roomRelations: string;
  status: number;
  createdOn: any;
  updatedOn: any;
}


