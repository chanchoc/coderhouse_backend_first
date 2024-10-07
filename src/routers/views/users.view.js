import { Router } from "express";
import {
    checkLoginView,
    loginView,
    logoutView,
    profileView,
    registerView,
} from "../../controllers/users.controller.js";
import { createUserView } from "../../controllers/users.controller.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";

const usersViewRouter = Router();

usersViewRouter.get("/register", registerView);
usersViewRouter.post("/register", isValidUser, createUserView);
usersViewRouter.get("/login", loginView);
usersViewRouter.post("/login", checkLoginView);
usersViewRouter.get("/profile", profileView);
usersViewRouter.get("/logout", logoutView);

export default usersViewRouter;
