import { Request, Response } from "express";
import createError from "../../helpers/createError";
import bscrypt from "bcrypt";
import User from "../../models/users";
import { TUser } from "../../models/users";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import gravatar from "gravatar";
import { v4 as createId } from "uuid";
import sendEmail from "../../helpers/sendEmail/sendEmail";

/*
 *  1. to check: Is request body exist?
 *    - false : throw error {status: 400}
 *  2. to check: use SCHEMA : is body valid?
 *   - false :  throw error {status:400}
 *  3. to check: is user with the income email already exist?
 *   - true: throw error {status: 409, message: Email in use}
 *  4. to create verificationToken
 *  5. to hash password
 *  6. to hash email
 *  7. to create the user in DB
 *  8. to send verification email
 *  9. to respond: user: {
 *                   email,
 *                   subscription,
 *                 },
 */

const signup = async (req: TRequestAddUser, res: Response) => {
  const { NODE_ENV } = process.env;
  //to check: Is request body exist?
  if (!req.body) {
    throw createError({ status: 400 });
  }

  //tp check: Does the body's data match the schema?
  const { error }: { error: Error | undefined } = User.outerSchema.validateUser(
    req.body
  );
  if (error) {
    throw createError({
      status: 400,
      messageProd: error.message,
    });
  }

  //to check: Is the user with the email exist in data base?
  const { email, password, subscription = "starter" }: TUser = req.body;
  const user: TUser | null = await User.model.findOne({ email });
  if (user) {
    throw createError({
      status: 409,
      messageProd: `Email in use`,
      nodeEnv: NODE_ENV,
    });
  }
  // 4. to create verificationToken
  const verificationToken = createId();

  //to hash password
  const salt = 10;
  const hashPassword = await bscrypt.hash(password, salt);

  // to hash email
  const avatarURL = gravatar.url(email);

  //to add user's data to data base
  const result = await User.model.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  if (!result) {
    throw createError({
      status: 500,
    });
  }

  // 5. to send verification email
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target='_blank' href='http://localhost:${process.env.PORT}/users/verify/${verificationToken}'>Confirm your email</a>`,
  };
  await sendEmail(mail);

  //to create response
  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

export default signup;
