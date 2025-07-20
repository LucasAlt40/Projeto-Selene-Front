export type TicketRequestDTO = {
  eventId: number;
  categoryId: number;
  quantity: number;
};

export type CreateOrderRequestDTO = {
  tickets: TicketRequestDTO[];
  customerId: number;
};
