import { BindIdentityProviderUseCaseDto } from "src/auth/domain/dtos";
import { AuthRepository } from "src/auth/domain/repository";
import { BindIdentityProviderUseCase } from "src/auth/domain/use-cases";


export class BindIdentityProvider implements BindIdentityProviderUseCase {

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    execute(props: BindIdentityProviderUseCaseDto): Promise<boolean> {
        return this.authRepository.bindIdentityProvider({
            ...props
        })
    }

}