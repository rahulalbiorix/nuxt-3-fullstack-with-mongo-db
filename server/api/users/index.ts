import UserModel from "~/server/models/User.model";

export default defineEventHandler(async (event) => {
  const users = await UserModel.find();
  return {
    users,
  };
});
