import TransactionModel from "~/server/models/Transaction.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await TransactionModel.create(body);
    return { message: "Created Successfully" };
  } catch (error) {
    console.error("error:", error);
  }
});
