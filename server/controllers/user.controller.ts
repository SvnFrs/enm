import type { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import type { User } from "../types/user.types";

const userModel = new UserModel();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id || "";
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await userModel.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id || "";
    const user: User = req.body;

    const success = await userModel.update(id, user);

    if (!success) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id || "";
    const success = await userModel.delete(id);

    if (!success) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
