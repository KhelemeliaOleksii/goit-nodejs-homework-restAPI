import saveUser from "./saveUser";
import getAll from "./getAllContacts";
import getOne from "./getContact";
import findOneAndUpdate from "./findAndUpdateContact";
import findOneAndDelete from "./findAndDeleteContact";
const servicesContactDB = {
  saveUser,
  getAll,
  getOne,
  findOneAndUpdate,
  findOneAndDelete,
};

export default servicesContactDB;
