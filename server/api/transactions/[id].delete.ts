import TransactionModel from "~/server/models/Transaction.model";
import { Response } from "~/types/response";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  try {
    await TransactionModel.findByIdAndDelete(id);
    const message: string = "Deleted Successfully";
    return { message } as Response;
  } catch (error) {
    console.error("error:", error);
  }
});
