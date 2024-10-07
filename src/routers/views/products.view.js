import { Router } from "express";
import {
    adminView,
    createProductView,
    deleteProductView,
    productsView,
    productView,
    updateProductView,
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsViewRouter = Router();

productsViewRouter.get("/", productsView);
productsViewRouter.get("/admin", adminView);
productsViewRouter.post("/admin", isValidProduct, createProductView);
productsViewRouter.get("/:pid", productView);
productsViewRouter.put("/:pid", updateProductView);
productsViewRouter.delete("/:pid", deleteProductView);

export default productsViewRouter;
