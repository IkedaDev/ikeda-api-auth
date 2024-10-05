import { SOCIAL_AUTH_PROVIDER } from "src/auth/domain/enum"


export interface BindIdentityProviderUseCaseDto {
    accessToken: string
    userKeycloakId: string
    userProviderId: string
    userProviderName:string
    provider: SOCIAL_AUTH_PROVIDER
}