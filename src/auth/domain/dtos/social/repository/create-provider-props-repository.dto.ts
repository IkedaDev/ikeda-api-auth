import { SOCIAL_AUTH_PROVIDER } from "src/auth/domain/enum/social-auth-provider.enum";

export interface CreateProviderProps {
    provider: SOCIAL_AUTH_PROVIDER
}