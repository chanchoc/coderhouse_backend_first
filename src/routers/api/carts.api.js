import { Router } from "express";
import {
    getAllCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart,
    deleteManyCarts,
    calculateTotal,
} from "../../controllers/carts.controller.js";
import isValidCart from "../../middlewares/isValidCart.mid.js";

const cartsRouter = Router();

cartsRouter.get("/", getAllCarts);
cartsRouter.get("/:cid", getCart);
cartsRouter.get("/total/:uid", calculateTotal);
cartsRouter.post("/", isValidCart, createCart);
cartsRouter.put("/:cid", updateCart);
cartsRouter.delete("/:cid", deleteCart);
cartsRouter.delete("/", deleteManyCarts);

export default cartsRouter;
