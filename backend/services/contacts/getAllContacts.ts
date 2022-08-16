import Contact from "../../models/contacts";

const getAllContacts = async ({
  filterSettings,
  whiteList,
  displaySettings,
}: {
  filterSettings: object;
  whiteList: string;
  displaySettings: { page: number; limit: number };
}) => {
  const { page = 1, limit = 20 } = displaySettings;
  const skip = (page - 1) * limit;

  return await Contact.model.find(filterSettings, whiteList, {
    skip,
    limit,
  });
};
export default getAllContacts;
