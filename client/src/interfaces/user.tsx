// 注册模块
export interface RegisterRequest {
  email: string;
  password: string;
}

// 登录模块
export interface NormalLoginRequest {
  email: string;
  password: string;
}

export interface NormalLoginResponse {
  data: {
    token: string;
  }
}

export interface DingdingUserInfoRequest {
  token: string;
}
// export type LoginResponse = LoginResponse[] | undefined

    