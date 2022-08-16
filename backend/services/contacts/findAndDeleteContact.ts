import { Schema } from "mongoose";
import Contact from "../../models/contacts";

const findOneAndDelete = async (searchParams: {
  _id: string;
  owner: typeof Schema.Types.ObjectId;
}) => {
  return await Contact.model.findByIdAndRemove({ searchParams });
};

export default findOneAndDelete;
