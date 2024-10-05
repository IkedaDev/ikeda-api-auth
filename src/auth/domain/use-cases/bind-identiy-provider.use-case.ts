import { BindIdentityProviderUseCaseDto } from "../dtos";


export abstract class BindIdentityProviderUseCase {
    abstract execute(props: BindIdentityProviderUseCaseDto): Promise<boolean>
} 