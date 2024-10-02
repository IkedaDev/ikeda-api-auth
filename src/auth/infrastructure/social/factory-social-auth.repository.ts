import { CreateProviderProps } from "../../domain/dtos";
import { ISocialAuthFactory, SocialAuthProvider } from "../../../auth/domain/repository";
import { SOCIAL_AUTH_PROVIDER } from "../../domain/enum";
import { GoogleAuthProvider } from "./google-auth.repository";
import { CustomError } from "../../../core/models";
import { Envs } from "../../../core/adapters/env";


export class SocialAuthFactory implements ISocialAuthFactory{
    
    private readonly providers: Record<SOCIAL_AUTH_PROVIDER, SocialAuthProvider>;

    constructor(){
        this.providers = {
            [SOCIAL_AUTH_PROVIDER.GOOGLE]: new GoogleAuthProvider({
                clientId: Envs.AUTH_OAUTH_GOOGLE_CIENT_ID
            })
        }
    }

    createProvider(options: CreateProviderProps): SocialAuthProvider {
        const provider = this.providers[options.provider]
        if( !provider ) throw CustomError.internalServer()
        return provider
    }

} 