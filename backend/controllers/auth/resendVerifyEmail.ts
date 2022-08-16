import { Request, Response } from "express";
import createError from "../../helpers/createError";
import User from "../../models/users";
import sendEmail from "../../helpers/sendEmail/sendEmail";
/*
 * 1. to check: Does email exist in request body?
 *   - false : throw error({status: 400})
 * 2. to check: use SCHEMA : is email valid?
 *   - false : throw error({status: 400})
 * 3. to check: is a user with the email in DB exist?
 *   - false : throw error({status:404})
 * 4. to check: does verification is passsed by user?
 *   - true : throw error ({status:400})
 * 5. to create and send: a mail
 * 6. to respond: 
  //   Status: 200 Ok
  //   Content-Type: application/json
  //   ResponseBody: {
  //   "message": "Verification email sent"
  // }
 */
const resendVerifyEmail = async (req: Request, res: Response) => {
  //1. to check: Does email exist in request body?
  const { email } = req.body;
  if (!email) {
    throw createError({ status: 400 });
  }
  //2. to check: use SCHEMA : is email valid?
  const { error } = User.outerSchema.validateEmail(email);
  if (error) {
    throw createError({
      status: 400,
      messageProd: `Invalid email. JOI: ${error}`,
    });
  }
  // 3. to check: is a user with the email in DB exist?
  const user = await User.model.findOne({ email });
  if (!user) {
    throw createError({
      status: 404,
      messageProd: "User does not exist",
    });
  }
  // 4. to check: does verification is passsed by user?
  if (!user.verificationToken) {
    throw createError({
      status: 400,
      messageProd: "Verification has already been passed",
    });
  }
  //5. to create and send: a mail
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target='_blank' href='http://localhost:${process.env.PORT}/users/verify/${user.verificationToken}'>Confirm your email</a>`,
  };
  await sendEmail(mail);
  // 6. to respond:

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};
export default resendVerifyEmail;
