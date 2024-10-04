

interface Props{
    url:string
}

export class GetUrlSocialLoginResponseDto {
    public readonly url: string

    constructor({ url }:Props){
        this.url = url
    }
}