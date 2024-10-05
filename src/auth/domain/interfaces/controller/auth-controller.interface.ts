import { AuthRepository, ILoginAuthFactory, ISocialAuthFactory } from "../../repository";
import { IAuthService } from "../../services";

export interface AuthControllerProps{
    authRepository: AuthRepository
    socialAuthFactory: ISocialAuthFactory
    authService: IAuthService
    loginAuthFactory : ILoginAuthFactory
}