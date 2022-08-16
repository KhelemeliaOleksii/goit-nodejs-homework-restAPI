import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import servicesContactDB from "../../services/contacts";

const put = async (req: TRequestAddUser, res: Response) => {
  const { body, user } = req;
  // to check: Does a user exist
  if (!user) {
    throw createError({
      status: 401,
    });
  }

  // to check: Does a request body exist
  if (!body) {
    throw createError({
      status: 404,
    });
  }

  //to check by outer Schema
  const { error } = Contact.outerSchema.validateContactAdd(body);
  if (error) {
    throw createError({ status: 400 });
  }

  const { contactId } = req.params;

  const searchParams = {
    _id: contactId,
    owner: user._id,
  };

  const result = await servicesContactDB.findOneAndUpdate(searchParams, body);

  if (!result) {
    throw createError({ status: 404 });
  }

  res.status(200).json(result);
};

export default put;
