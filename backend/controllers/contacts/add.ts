import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
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
const add = async (req: TRequestAddUser, res: Response) => {
  const { body, user } = req;
  // 1. to check: is user available?
  if (!user) {
    throw createError({
      status: 401,
    });
  }
  // 2. to check: does body request exist?
  if (!body) {
    throw createError({
      status: 400,
    });
  }
  // 3. to check: use SCHEMA
  const { error } = Contact.outerSchema.validateContactAdd(body);
  if (error) {
    throw createError({
      status: 400,
    });
  }
  // to save user's data to the DB
  const result = await servicesContactDB.saveUser(body, user._id);
  res.status(201).json(result);
};

export default add;
