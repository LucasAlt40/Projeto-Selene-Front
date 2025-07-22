export type TicketRequestDTO = {
  eventId: number;
  categoryId: number;
  quantity: number;
};

export type CreateOrderRequestDTO = {
  tickets: TicketRequestDTO[];
  customerId: number;
};

export type OrderResponseDTO = {
  id: number;
  items: Array<{
    ticketCategoryDescription: string;
    ticketCategoryQuantity: number;
    eventId: number;
    ticketCategoryPrice: number;
  }>;
  status: string;
};

export type ResponseCreateCheckoutDTO = {
  id: string;
  links: Array<{
    rel: string;
    href: string;
    method: string;
  }>;
  status: string;
};

export type ResponseOrderDTO = {
  order: OrderResponseDTO;
  checkout: ResponseCreateCheckoutDTO;
};

export type OrderDTO = {
  id: number;
  items: ItemOrderDTO[];
  status: 'WAITING_PAYMENT' | 'CANCELLED' | 'COMPLETED';
};

export type ItemOrderDTO = {
  ticketCategoryDescription: string;
  ticketCategoryQuantity: number;
  eventId: number;
  ticketCategoryPrice: number;
};
