

import { LogoutRequestDto, LogoutResponseDto } from "../dtos";

export abstract class UserLogoutUseCase{
    abstract execute( logoutDto: LogoutRequestDto ): Promise<LogoutResponseDto>
}