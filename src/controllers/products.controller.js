import productsManager from "../data/products.manager.js";

async function getAllProducts(req, res, next) {
    try {
        const { category } = req.query;
        let response;
        if (!category) {
            response = await productsManager.readAll();
        } else {
            response = await productsManager.readAll(category);
        }
        if (response.length > 0) {
            return res.status(200).json({ message: "Success reading products", response });
        } else if (!category) {
            const error = new Error("Products not found");
            error.statusCode = 404;
            throw error;
        } else {
            const error = new Error(`Products with category ${category} not found`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function getProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsManager.readOne(pid);
        if (response.length > 0) {
            return res.status(200).json({ message: "Success reading product", response });
        } else {
            const error = new Error(`Product with Id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function createProduct(req, res, next) {
    try {
        const product = req.body;
        const response = await productsManager.create(product);
        return res.status(201).json({ message: "Success creating product", response });
    } catch (error) {
        return next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const product = req.body;
        const response = await productsManager.update(pid, product);
        if (!response) {
            const error = new Error(`Product with Id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success updating product", response });
    } catch (error) {
        return next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsManager.delete(pid);
        if (!response) {
            const error = new Error(`Product with Id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success deleting product", response });
    } catch (error) {
        return next(error);
    }
}

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
