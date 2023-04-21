export class AuthResponse {
  auth: BizAuthentication;
  firstName: string;
  lastName: string;
}

export class BizAuthentication {
  userName: string;
  token: string;
  authenticated: boolean;
  authorities = [];
}

export class User {
  constructor(userName: string, firstName: string, lastName: string) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
  }
  userName: string;
  firstName: string;
  lastName: string;
}
