import { Router } from "express";
import {
    getAllCartsView,
    createCartsView,
    updateCartsView,
    deleteCartsView,
    deleteManyCartsView,
} from "../../controllers/carts.controller.js";
import isValidCart from "../../middlewares/isValidCart.mid.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/", getAllCartsView);
cartsViewRouter.post("/", isValidCart, createCartsView);
cartsViewRouter.put("/:cid", updateCartsView);
cartsViewRouter.delete("/:cid", deleteCartsView);
cartsViewRouter.delete("/", deleteManyCartsView);

export default cartsViewRouter;
