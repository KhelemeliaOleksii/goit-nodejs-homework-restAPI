import { Request, Response } from "express";
import createError from "../../helpers/createError";
import User from "../../models/users";
/*
 * DBstate "User":    Before     After
 *           verify:  false  ->  true
 *verificationToken:  "token"->  null
 * 1. to get: verificationToken from request's parameters
 * 2. to check: is verificationToken empty?
 *    - true -> throw error {
 *        status: error,
 *        code: 404,
 *        message: "Not Found"
 *      }
 * 3. to find out: in data base a user with the same verification token
 * 4. to check: is user exist
 *    - false => throw error - not found
 * 5. to patch user data: {
 *    verificationToken: null,
 *    verify: true
 * }
 * 6. to respond: {
 *    status: success,
 *    code: 200,
 *    message: "Verification valid"
 * }
 */

const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    throw createError({
      status: 404,
      messageProd: "User not found",
    });
  }
  const user = await User.model.findOne({ verificationToken });
  if (!user) {
    throw createError({
      status: 404,
      messageProd: "User not found",
    });
  }
  await User.model.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};
export default verifyEmail;
