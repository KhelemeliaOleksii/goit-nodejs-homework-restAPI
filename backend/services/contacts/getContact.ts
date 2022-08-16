import Contact from "../../models/contacts";

const getContact = async (searchConfig: object) => {
  return await Contact.model.findOne(searchConfig);
};
export default getContact;
