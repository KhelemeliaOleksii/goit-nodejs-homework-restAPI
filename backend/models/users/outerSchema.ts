import Joi, { string } from "joi";
import { TUser } from "./typesTS";
import { userSubscription } from "./userSubscription";

const passwordSchema = Joi.object({
  password: Joi.string()
    .required()
    .error(() => new Error("Password is required")),
});

const validatePassword = (password: string) =>
  passwordSchema.validate(() => ({ password }));

const emailSchema = Joi.object({
  email: Joi.string()
    .required()
    .error(() => new Error("Email is required")),
});

const validateEmail = (email: string) => {
  const emailObj = { email };
  return emailSchema.validate(emailObj);
};

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...userSubscription)
    .default("starter")
    .error(
      () => new Error(`subscription supported values: ${userSubscription}`)
    ),
});
const validateSubscription = (subscription: object) =>
  subscriptionSchema.validate(subscription);

const tokenSchema = Joi.object({
  token: Joi.string().default(null),
});

const validateToken = (token: string) => tokenSchema.validate(token);

const userSchema = Joi.object()
  .concat(passwordSchema)
  .required()
  .concat(emailSchema)
  .required()
  .concat(subscriptionSchema)
  .concat(tokenSchema);

const validateUser = (user: TUser) => userSchema.validate(user);

const outerSchema = {
  validateEmail,
  validatePassword,
  validateSubscription,
  validateToken,
  validateUser,
};
export default outerSchema;
