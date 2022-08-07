export interface AccountData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
  gender: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipcode: number;
  }
}
