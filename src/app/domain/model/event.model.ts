export type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  address: Address;
  previewImageUrl: string;
  status: EventStatusEnum;
};

export type Address = {
  city: string;
  neighbourhood: string;
  street: string;
  number: string;
  zipCode: string;
  state: string;
};

export enum EventStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
