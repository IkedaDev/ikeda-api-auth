export interface GetAccessTokenGoogle {
    access_token: string;
    expires_in:   number;
    scope:        string;
    token_type:   string;
    id_token:     string;
}

export interface GetUserInfoGoogle {
    sub:            string;
    name:           string;
    given_name:     string;
    family_name:    string;
    picture:        string;
    email:          string;
    email_verified: boolean;
}

