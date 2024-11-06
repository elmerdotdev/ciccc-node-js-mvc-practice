"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [];
    }
    create(userData) {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, userData);
        this.users.push(newUser);
        return newUser;
    }
    findAll() {
        return this.users;
    }
    findById(id) {
        return this.users.find(user => user.id === id);
    }
    update(id, userData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return undefined;
        const updatedUser = Object.assign(Object.assign({}, this.users[userIndex]), userData);
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
}
exports.default = new UserModel();
