import { AuthRepository, ISocialAuthFactory } from "../../repository";
import { IAuthService } from "../../services";

export interface AuthControllerProps{
    authRepository: AuthRepository
    socialAuthFactory: ISocialAuthFactory
    authService: IAuthService
}