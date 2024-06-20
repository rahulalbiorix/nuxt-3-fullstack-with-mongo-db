import TransactionModel from "~/server/models/Transaction.model";
import { Transaction } from "~/types/transction";

export default defineEventHandler(async (event) => {
  const data: Transaction[] = await TransactionModel.find({}).sort({
    createdAt: 1,
  });
  return {
    data,
  };
});
