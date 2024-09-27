
interface Props {
    exp:                number;
    iat:                number;
    typ:                string;
    acr:                string;
    "allowed-origins":  string[];
    realm_access:       Access;
    resource_access:    { account: Access };
    scope:              string;
    email_verified:     boolean; 
    name:               string;
    preferred_username: string;
    given_name:         string;
    family_name:        string;
    username:           string;
    status:             true
    token_type:         string;
    email:              string;
    jti:                string;
    iss:                string;
    aud:                string;
    sub:                string;
    azp:                string;
    sid:                string;
    client_id:          string;
}

interface Access {
    roles: string[];
}


export class ValidTokenStatus {
    public readonly status: true;
    public readonly exp: number;
    public readonly iat: number;
    public readonly typ: string;
    public readonly acr: string;
    public readonly allowedOrigins: string[];
    public readonly realmAccess: Access;
    public readonly resourceAccess: { account: Access };
    public readonly scope: string;
    public readonly emailVerified: boolean;
    public readonly name: string;
    public readonly preferredUsername: string;
    public readonly givenName: string;
    public readonly familyName: string;
    public readonly username: string;
    public readonly tokenType: string;
    public readonly email: string;
    public readonly jti: string;
    public readonly iss: string;
    public readonly aud: string;
    public readonly sub: string;
    public readonly azp: string;
    public readonly sid: string;
    public readonly clientId: string;

    constructor(props: Props){
        this.status = props.status;
        this.exp = props.exp;
        this.iat = props.iat;
        this.typ = props.typ;
        this.acr = props.acr;
        this.allowedOrigins = props["allowed-origins"];
        this.realmAccess = props.realm_access;
        this.resourceAccess = props.resource_access;
        this.scope = props.scope;
        this.emailVerified = props.email_verified;
        this.name = props.name;
        this.preferredUsername = props.preferred_username;
        this.givenName = props.given_name;
        this.familyName = props.family_name;
        this.username = props.username;
        this.tokenType = props.token_type;
        this.email = props.email;
        this.jti = props.jti;
        this.iss = props.iss;
        this.aud = props.aud;
        this.sub = props.sub;
        this.azp = props.azp;
        this.sid = props.sid;
        this.clientId = props.client_id;
    }

}