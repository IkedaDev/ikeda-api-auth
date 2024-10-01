export interface FindUsersResponse {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    emailVerified: boolean,
    createdTimestamp: number,
    enabled: boolean,
    totp: boolean,
    disableableCredentialTypes: any[],
    requiredActions: any[],
    notBefore: number,
    access: {
      manageGroupMembership: boolean,
      view: boolean,
      mapRoles: boolean,
      impersonate: boolean,
      manage: boolean
    }
  }
