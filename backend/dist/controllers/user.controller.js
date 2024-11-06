"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const hash_util_1 = require("../utils/hash.util");
function getAllUsers(req, res) {
    const users = user_model_1.default.findAll();
    res.json(users);
}
function getUserById(req, res) {
    const id = req.params.id;
    const user = user_model_1.default.findById(id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = yield (0, hash_util_1.hashPassword)(password);
            const newUser = user_model_1.default.create({ name, email, password: hashedPassword });
            req.session.isAuthenticated = true;
            res.status(201).json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'User cannot be added' });
        }
    });
}
function updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const updatedUser = user_model_1.default.update(id, { name, email, password });
    if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(updatedUser);
}
function deleteUser(req, res) {
    const id = req.params.id;
    const isDeleted = user_model_1.default.delete(id);
    if (!isDeleted) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.status(204).send();
}
exports.default = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
