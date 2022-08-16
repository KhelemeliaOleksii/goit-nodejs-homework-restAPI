import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import servicesContactDB from "../../services/contacts";

const updateStatusContact = async (req: TRequestAddUser, res: Response) => {
  const { body, user } = req;
  if (!user) {
    throw createError({ status: 401 });
  }

  if (!body) {
    throw createError({ status: 400 });
  }

  const { error } = Contact.outerSchema.validatePatchFavorite(body);
  if (error) {
    throw createError({
      status: 400,
      messageProd: error.message,
    });
  }
  const { contactId } = req.params;

  const searchParams = {
    _id: contactId,
    owner: user._id,
  };

  const result = await servicesContactDB.findOneAndUpdate(searchParams, body);

  if (!result) {
    throw createError({
      status: 404,
    });
  }
  res.json(result);
};

export default updateStatusContact;
