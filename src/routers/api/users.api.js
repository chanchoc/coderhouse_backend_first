import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../../controllers/users.controller.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:uid", getUser);
usersRouter.post("/", isValidUser, createUser);
usersRouter.put("/:uid", updateUser);
usersRouter.delete("/:uid", deleteUser);

export default usersRouter;
