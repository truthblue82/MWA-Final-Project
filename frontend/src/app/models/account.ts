export interface AccountData {
  _id?: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  username: string;
  role: string;
  avatar: string;
  file: File;
  gender: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipcode: number;
  }
}
