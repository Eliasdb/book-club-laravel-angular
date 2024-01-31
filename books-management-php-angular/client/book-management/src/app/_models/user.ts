export interface User {
  email: string;
  password: string;
  passwordConfirmation?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  city: string;
  token?: string;
  id?: number;
  userName?: string;
  accessToken?: string;
}
