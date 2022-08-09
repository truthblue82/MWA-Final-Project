export interface Warehouse {
  _id?: string;
  name: string;
  phone: string;
  description: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipcode: number;
  },
  location: [number, number];
  employees: [];
}
