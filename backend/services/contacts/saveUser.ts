import { Schema } from "mongoose";
import Contact, { TContactAdd } from "../../models/contacts";

const saveUser = async (
  contactBody: TContactAdd,
  id: typeof Schema.Types.ObjectId
) => {
  return await Contact.model.create({ ...contactBody, owner: id });
};

export default saveUser;
