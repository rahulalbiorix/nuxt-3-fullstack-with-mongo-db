import TransactionModel from "~/server/models/Transaction.model";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  try {
    await TransactionModel.findByIdAndDelete(id);
    return { message: "Deleted Successfully" };
  } catch (error) {
    console.error("error:", error);
  }
});
