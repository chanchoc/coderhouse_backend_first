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
        if (response) {
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

async function productsView(req, res, next) {
    try {
        const { category } = req.query;
        let response;
        if (!category) {
            response = await productsManager.readAll();
        } else {
            response = await productsManager.readAll(category);
        }
        if (response.length > 0) {
            return res.render("products", {
                products: response.filter((product) => product.stock > 0),
                category: category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products",
            });
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

async function productView(req, res, next) {
    try {
        const { pid } = req.params;
        const product = await productsManager.readOne(pid);
        if (product) {
            return res.render("oneproduct", { product });
        } else {
            const error = new Error(`Product with Id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function topsView(req, res, next) {
    try {
        const response = await productsManager.readAll();
        const rinoneras = response
            .filter((product) => product.category === "riñoneras" && product.stock > 0)
            .sort((a, b) => b.stock - a.stock)
            .slice(0, 3);
        const mochilas = response
            .filter((product) => product.category === "mochilas" && product.stock > 0)
            .sort((a, b) => b.stock - a.stock)
            .slice(0, 3);
        return res.render("index", { rinoneras, mochilas });
    } catch (error) {
        return next(error);
    }
}

async function adminView(req, res, next) {
    try {
        const products = await productsManager.readAll();
        return res.render("admin", { products });
    } catch (error) {
        return next(error);
    }
}

async function deleteProductView(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsManager.delete(pid);
        if (!response) {
            const error = new Error(`Product with Id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.redirect("/products/admin");
    } catch (error) {
        return next(error);
    }
}

async function createProductView(req, res, next) {
    try {
        const product = req.body;
        await productsManager.create(product);
        return res.redirect("/products/admin");
    } catch (error) {
        return next(error);
    }
}

async function updateProductView(req, res, next) {
    try {
        const { pid } = req.params;
        const product = req.body;
        const response = await productsManager.update(pid, product);
        if (!response) {
            const error = new Error(`Product with Id ${pid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.redirect("/products/admin");
    } catch (error) {
        return next(error);
    }
}

export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    productsView,
    productView,
    topsView,
    adminView,
    deleteProductView,
    createProductView,
    updateProductView,
};
