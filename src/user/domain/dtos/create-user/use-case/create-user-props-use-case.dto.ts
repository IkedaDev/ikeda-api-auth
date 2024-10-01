import { CreateUserRequestDto } from "../create-user-request.dto.interface";

export interface CreateUserProspUseCase extends CreateUserRequestDto {
    accessToken: string
}