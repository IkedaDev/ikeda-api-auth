import { BindIdentityProviderRepositoryDto, CreateProviderProps } from "../dtos";
import { SocialAccessToken, SocialUserLogin } from "../entities";
import { GetAccessTokenPropsRepository, GetProfilePropsRepository, GetUrlPropsRepository } from "../interfaces";



export abstract class ISocialAuthFactory {
    abstract createProvider(options: CreateProviderProps): SocialAuthProvider
} 

export abstract class SocialAuthProvider {
    abstract getUrl( options : GetUrlPropsRepository ): Promise<string>
    abstract getAccessToken(options: GetAccessTokenPropsRepository): Promise<SocialAccessToken>
    abstract getUserProfile(options: GetProfilePropsRepository): Promise<SocialUserLogin>
}