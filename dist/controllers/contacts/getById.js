"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("../../helpers/createError"));
const contacts_1 = __importDefault(require("../../models/contacts"));
const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts_1.default.model.findById(contactId);
    if (!result) {
        throw (0, createError_1.default)(404);
    }
    res.status(200).json(result);
};
exports.default = getById;