import { AuthRepository, ISocialAuthFactory } from "../../repository";

export interface AuthControllerProps{
    authRepository: AuthRepository
    socialAuthFactory: ISocialAuthFactory
}