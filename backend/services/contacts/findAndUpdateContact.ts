import Contact from "../../models/contacts";

const findAndUpdateContact = async (
  searchParams: object,
  bodyContact: object
) => {
  return await Contact.model.findOneAndUpdate(searchParams, bodyContact, {
    new: true,
  });
};

export default findAndUpdateContact;
