export interface Order {
    id?: string;
    sender_name: string;
    receiver_name: string;
    receiver_phone: string;
    // receiver_address: {
    //     street: string,
    //     city: string,
    //     state: string,
    //     country: string,
    //     zipcode: string
    // }
    // note: string;
    // weight: number;
    // size: string;
    // order_value: number;
    // cost: number;
    // deliver_type: string;
    // insurance: string;
    // image: string;
    // order_status: string;
    // assignee: string;
    // route: [{
    //     name: string,
    //     contact_point: string,
    //     address: string,
    //     phone: string
    // }]
  }