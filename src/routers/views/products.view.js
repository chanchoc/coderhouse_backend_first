import { Router } from "express";
import {
    adminView,
    createProductView,
    deleteProductView,
    paginateProductsView,
    productView,
    updateProductView,
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsViewRouter = Router();

productsViewRouter.get("/", paginateProductsView);
productsViewRouter.get("/admin", adminView);
productsViewRouter.post("/admin", isValidProduct, createProductView);
productsViewRouter.get("/:pid", productView);
productsViewRouter.put("/:pid", updateProductView);
productsViewRouter.delete("/:pid", deleteProductView);

export default productsViewRouter;
