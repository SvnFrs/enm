import { Collection, Db, ObjectId } from "mongodb";
import type { User } from "../types/user.types";
import { getDB } from "../config/db.config";

export class UserModel {
  private collection: Collection<User>;

  constructor() {
    this.collection = getDB().collection<User>("users");
  }

  async findAll(): Promise<User[]> {
    return await this.collection.find().toArray();
  }

  async findById(id: string): Promise<User | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByName(name: string): Promise<User | null> {
    return this.collection.findOne({
      // Use regex to perform a case-insensitive search
      name: { $regex: new RegExp(name, "i") }
    })
  }

  async create(user: User): Promise<User> {
    const result = await this.collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  async update(id: string, user: User): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: user }
    );
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}
