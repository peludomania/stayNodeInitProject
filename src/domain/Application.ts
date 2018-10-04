export interface ITypes {
  IApplication: symbol;
  IDatabase: symbol;
  IExpressServer: symbol;
  IKafkaConsumer: symbol;
  IKafkaProducer: symbol;
  IExpressRouter: symbol;
}

export interface IResponse {
  success: boolean;
  errors: string[];
  data: any; // tslint:disable-line:no-any
}

export interface ICommit {
  service: string;
  datetime: string;
  event: string;
  payload: any; // tslint:disable-line:no-any
  establishment?: string;
}

export interface IOAuth2Token {
  id_token?: string;
  access_token: string;
  expires_in: number;
  token_type?: string;
  refresh_token: string;
}
