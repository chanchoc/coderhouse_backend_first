import cartsMongoManager from "../data/mongo/managers/cart.manager.js";

async function getAllCarts(req, res, next) {
    try {
        const filter = req.query;
        const response = await cartsMongoManager.readAll(filter);
        if (response.length > 0) {
            return res.status(200).json({ message: "Success reading carts", response });
        } else {
            const error = new Error("Carts not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function getCart(req, res, next) {
    try {
        const { cid } = req.params;
        const response = await cartsMongoManager.readOne(cid);
        if (response) {
            return res.status(200).json({ message: "Success reading cart", response });
        } else {
            const error = new Error(`Cart with Id ${cid} not found`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function createCart(req, res, next) {
    try {
        const cart = req.body;
        const response = await cartsMongoManager.create(cart);
        return res.status(201).json({ message: "Success creating cart", response });
    } catch (error) {
        return next(error);
    }
}

async function updateCart(req, res, next) {
    try {
        const { cid } = req.params;
        const cart = req.body;
        const response = await cartsMongoManager.update(cid, cart);
        if (!response) {
            const error = new Error(`Cart with Id ${cid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success updating cart", response });
    } catch (error) {
        return next(error);
    }
}

async function deleteCart(req, res, next) {
    try {
        const { cid } = req.params;
        const response = await cartsMongoManager.delete(cid);
        if (!response) {
            const error = new Error(`Cart with Id ${cid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success deleting cart", response });
    } catch (error) {
        return next(error);
    }
}

async function deleteManyCarts(req, res, next) {
    try {
        const filter = req.query;
        if (Object.keys(filter).length === 0) {
            const error = new Error("Filter is needed to delete many carts");
            error.statusCode = 400;
            throw error;
        }
        const response = await cartsMongoManager.deleteMany(filter);
        if (response.deletedCount > 0) {
            return res.status(200).json({ message: "Success deleting carts", response });
        } else {
            const error = new Error("Carts not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function calculateTotal(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await cartsMongoManager.calculateTotal(uid);
        if (!response) {
            const error = new Error(`Cart of user with Id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success calculating total", response });
    } catch (error) {
        return next(error);
    }
}

async function getAllCartsView(req, res, next) {
    try {
        const filter = req.session.user_id ? { user_id: req.session.user_id } : {};
        const cart = await cartsMongoManager.readAll(filter);
        console.log(cart);
        return res.render("carts", { cart });
    } catch (error) {
        return next(error);
    }
}

async function createCartsView(req, res, next) {
    try {
        const cart = req.body;
        await cartsMongoManager.create(cart);
        return res.redirect("/carts");
    } catch (error) {
        return next(error);
    }
}

async function deleteCartsView(req, res, next) {
    try {
        const { cid } = req.params;
        const response = await cartsMongoManager.delete(cid);
        if (!response) {
            const error = new Error(`Cart with Id ${cid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.redirect("/carts");
    } catch (error) {
        return next(error);
    }
}

async function deleteManyCartsView(req, res, next) {
    try {
        const filter = req.query;
        delete filter._method;
        console.log(filter);
        if (Object.keys(filter).length === 0) {
            const error = new Error("Filter is needed to delete many carts");
            error.statusCode = 400;
            throw error;
        }
        await cartsMongoManager.deleteMany(filter);
        return res.redirect("/carts");
    } catch (error) {
        return next(error);
    }
}

async function updateCartsView(req, res, next) {
    try {
        const { cid } = req.params;
        const cart = req.body;
        const response = await cartsMongoManager.update(cid, cart);
        if (!response) {
            const error = new Error(`Cart with Id ${cid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.redirect("/carts");
    } catch (error) {
        return next(error);
    }
}

export {
    getAllCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart,
    deleteManyCarts,
    calculateTotal,
    getAllCartsView,
    createCartsView,
    updateCartsView,
    deleteCartsView,
    deleteManyCartsView,
};
