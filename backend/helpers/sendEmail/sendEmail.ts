import { TEmail } from "./emailTypes";
import sgMail from "@sendgrid/mail";
import createError from "../createError";

// const { SENDGRID_API_KEY } = process.env;
// if (!SENDGRID_API_KEY) {
//   throw new Error("sfgdf");
//   // throw createError({
//   //   status: 400,
//   //   // messageProd: "Invalid email key",
//   // });
// }

// sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data: TEmail) => {
  const { SENDGRID_API_KEY } = process.env;
  if (!SENDGRID_API_KEY) {
    throw createError({
      status: 500,
      messageProd: "Invalid email key",
    });
  }
  sgMail.setApiKey(SENDGRID_API_KEY);

  try {
    const email = { ...data, from: "oleksiikhel@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw createError({
      status: 500,
      messageProd: "A Message could not be send",
    });
  }
};

export default sendEmail;
