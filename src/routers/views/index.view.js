import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";
import { topsView } from "../../controllers/products.controller.js";

const viewsRouter = Router();

viewsRouter.get("/", topsView);
viewsRouter.use("/products", productsViewRouter);
viewsRouter.use("/users", usersViewRouter);

export default viewsRouter;
