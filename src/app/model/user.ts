export class User {
  // id?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;


  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
