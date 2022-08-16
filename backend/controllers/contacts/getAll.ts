import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import parseToInteger from "../../helpers/parseToInteger";
import servicesContactDB from "../../services/contacts";

/* 
// router require previous user's authentification
// 1. to check: is user available?
//    - false : throw error : 401
// 2. to check: does body request exist?
//    - false : throw error: 400
// 3. to check: use SCHEMA
//    - false : throw error: 400
// 4. to create: add user to DB
*/
const getAll = async (req: TRequestAddUser, res: Response) => {
  //to check: Does user property is
  if (!req.user) {
    throw createError({
      status: 401,
    });
  }

  // to get contacts for 'owner' with user.id
  // properties: page and limit(per page)
  const { _id: owner } = req.user;

  // to check query parameters
  const { page: pageStr = "1", limitStr = "20", favorite = false } = req.query;
  const page = parseToInteger(pageStr);
  const limit = parseToInteger(limitStr);
  if (page === null || limit === null) {
    throw createError({ status: 400, messageProd: "Invalid query parameters" });
  }

  //to create: filter settings
  type TFilter = {
    owner: typeof owner;
    favorite?: boolean;
  };
  const filterSettings: TFilter = { owner };
  if (favorite) {
    filterSettings.favorite = true;
  }

  //to create: configure settings
  const configureSettings = {
    filterSettings,
    whiteList: "name email phone",
    displaySettings: { page, limit },
  };

  //to request all contacts with owner - the user
  const result = await servicesContactDB.getAll(configureSettings);

  if (!result) {
    throw createError({
      status: 404,
    });
  }

  res.status(200).json(result);
};

export default getAll;
