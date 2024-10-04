import { SOCIAL_AUTH_PROVIDER } from "../../../../enum"

export interface GetUrlSocialLoginUseCaseDto {
    provider: SOCIAL_AUTH_PROVIDER
    redirect_url: string
}