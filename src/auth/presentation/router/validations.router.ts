import { LOGIN_TYPE, SOCIAL_AUTH_PROVIDER } from "../../domain/enum";

export const loginValidationSchema = {
  grant_type: {
    notEmpty: {
      errorMessage: 'El grant_type es obligatorio',
    },
    custom: {
      options: (value: any) => {
        if (!Object.values(LOGIN_TYPE).includes(value)) {
            throw new Error(`El grant_type no es válido - ${Object.values(LOGIN_TYPE)}`);
        }
        return true;
      },
    },
  },
  username: {
    custom: {
      options: (_: any, { req }: any) => {
        if (req.body.grant_type === LOGIN_TYPE.PASSWORD) {
            if (!req.body.username) {
                throw new Error('El username es obligatorio cuando el grant_type es password');
            }
          }
          return true; 
      },
    },
  },
  password: {
    custom: {
      options: (_: any, { req }: any) => {
        if (req.body.grant_type === LOGIN_TYPE.PASSWORD) {
            if (!req.body.password) {
                throw new Error('El password es obligatorio cuando el grant_type es password');
            }
          }
          return true; 
      },
    },
  },
  token: {
    custom: {
      options: (_: any, { req }: any) => {
        if (req.body.grant_type === LOGIN_TYPE.TOKEN_EXCHANGE) {
          if (!req.body.token) {
            throw new Error('El token es obligatorio cuando el grant_type es urn:ietf:params:oauth:grant-type:token-exchange');
          }
        }
        return true; 
      },
    },
  },
  provider: {
    custom: {
      options: (value: any, { req }: any) => {
        if (req.body.grant_type === LOGIN_TYPE.TOKEN_EXCHANGE) {
          if (!Object.values(SOCIAL_AUTH_PROVIDER).includes(value)) {
            throw new Error(`Proveedor de autenticación no válido - ${Object.values(SOCIAL_AUTH_PROVIDER)}`);
          }
        }
        return true; 
      },
    },
  },
};
