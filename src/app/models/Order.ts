interface Order {
  id: number;
  userId: number;
  product: string;
  quantity: number;
  status: string;
}

export type { Order as Order };
