import { CreateProviderProps } from "../dtos";
import { GetUrlPropsRepository } from "../interfaces";



export abstract class ISocialAuthFactory {
    abstract createProvider(options: CreateProviderProps): SocialAuthProvider
} 

export abstract class SocialAuthProvider {
    abstract getUrl( options : GetUrlPropsRepository ): Promise<string>
    // async getAccessToken(code) {
    //     throw new Error("getAccessToken() debe ser implementado");
    //   }
    
    //   async getUserProfile(accessToken) {
    //     throw new Error("getUserProfile() debe ser implementado");
    //   }
}