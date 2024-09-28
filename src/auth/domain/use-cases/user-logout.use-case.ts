

import { LogoutRequestDto } from "../dtos";

export abstract class UserLogoutUseCase{
    abstract execute( logoutDto: LogoutRequestDto ): Promise<boolean>
}