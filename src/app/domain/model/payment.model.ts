export type Customer = {
  name: string;
  email: string;
  document: string;
  phone: {
    country: string;
    area: number;
    number: number;
  };
};

export type Item = {
  name: string;
  quantity: number;
  unitAmount: number;
  imageUrl: string;
};

export type RequestCheckout = {
  customer: Customer;
  paymentMethod: string;
  items: Array<Item>;
};

export type LinkResponse = {
  rel: string;
  href: string;
  method: string;
};
