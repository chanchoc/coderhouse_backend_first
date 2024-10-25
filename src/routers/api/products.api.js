import { Router } from "express";
import {
    getAllProducts,
    paginateProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../controllers/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/paginate", paginateProducts);
productsRouter.get("/:pid", getProduct);
productsRouter.post("/", isValidProduct, createProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
