import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { hashPassword } from '../utils/hash.util';

function getAllUsers(req: Request, res: Response) {
    const users = UserModel.findAll();
    res.json(users);
}

function getUserById(req: Request, res: Response) {
    const id = req.params.id;
    const user = UserModel.findById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
}

async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password)
    const newUser = UserModel.create({ name, email, password: hashedPassword });
    req.session!.isAuthenticated = true
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'User cannot be added' })
  }
}

function updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const updatedUser = UserModel.update(id, { name, email, password });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return
    }
    res.json(updatedUser);
}

function deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    const isDeleted = UserModel.delete(id);
    if (!isDeleted) {
      res.status(404).json({ message: 'User not found' });
      return
    }
    res.status(204).send();
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}