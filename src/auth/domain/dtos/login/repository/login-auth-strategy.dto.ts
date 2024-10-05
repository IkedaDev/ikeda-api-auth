import { LOGIN_TYPE, SOCIAL_AUTH_PROVIDER } from "src/auth/domain/enum";

export type LoginAuthStrategyDto = 
    | { grantType: LOGIN_TYPE.PASSWORD; username:string; password:string }
    | { grantType: LOGIN_TYPE.TOKEN_EXCHANGE; token:string; provider: SOCIAL_AUTH_PROVIDER }