// 钉钉
export interface getTicketRequest {
  appid: string;
  appkey: string;
}

export interface getTicketResponse {
  errcode: number;
  errmsg: string;
  ticket: string;
}

export interface jsConfigRequest {
  appid: string;
  ticket: string;
  url: string;
}

export interface genQRCodeRequest {
  ticket: string;
}

export interface qrCodeStatusRequest {
  uuid: string;
}

export interface jsConfigResponse {}