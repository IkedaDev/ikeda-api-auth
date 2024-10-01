import { CreateUserRequestDto } from "../create-user-request.dto.interface";

export interface CreateUserProspRepository extends CreateUserRequestDto {
    accessToken: string
}