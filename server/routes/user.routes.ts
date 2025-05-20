import { Router, type NextFunction, type Request, type Response } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName
} from "../controllers/user.controller";

const router = Router();

/**
 * RequestHandler type definition
 *
 * This type represents Express request handler functions that:
 * - Take a Request object containing client request data
 * - Take a Response object for sending back data to the client
 * - Optionally take a NextFunction for passing control to the next middleware
 * - Can return void, a Promise, or any other value
 *
 * Used for TypeScript type safety when defining route handlers
 */
type RequestHandler = (
  req: Request, res: Response, next?: NextFunction) => Promise<void | any> | void | any;


router.get("/", getUsers);
router.get("/id/:id", getUserById as RequestHandler);
router.get("/name/:name", getUserByName as RequestHandler);

router.post("/", createUser as RequestHandler);
router.put("/:id", updateUser as RequestHandler);
router.delete("/:id", deleteUser as RequestHandler);

export default router;
