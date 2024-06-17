export interface Transaction {
  _id: number;
  createdAt: String;
  updatedAt: String;
  amount?: number;
  type?: string;
  description?: string;
  category?: string;
}
