export interface GetTransactionBody {
  startDate: string;
  endDate: string;
  limit?: number;
}

export interface AddTransactionBody {
  categoryId: number;
  amount: number;
  paymentMethod: "cash" | "bank";
  date: string;
  note?: string;
}
