export type Role = 'ADMIN' | 'USER';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
