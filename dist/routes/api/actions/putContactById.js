'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateContactAdd_1 = require("./helpers/validateContactAdd");
const contacts_1 = __importDefault(require("../../../models/contacts"));
const createError_1 = require("../../../helpers/createError");
const putContactById = async (req, res) => {
    const { body } = req;
    const { error } = (0, validateContactAdd_1.validateContactAdd)(body);
    if (error) {
        throw (0, createError_1.createError)("400");
    }
    const { contactId } = req.params;
    const result = await contacts_1.default.contactsActions.updateContact(contactId, body);
    res.json(result);
};
exports.default = putContactById;
