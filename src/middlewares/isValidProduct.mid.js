function isValidProduct(req, res, next) {
    try {
        const { title } = req.body;
        if (!title || title === "") {
            const error = new Error("Title is required");
            error.statusCode = 400;
            throw error;
        } else {
            req.body.photo = req.body.photo
                ? req.body.photo
                : "./files/images/products/" + req.body.title.toLowerCase().replace(" ", "_") + ".png";
            req.body.category = req.body.category ? req.body.category.toLowerCase() : "mochilas";
            req.body.price = req.body.price ? req.body.price : 1;
            req.body.stock = req.body.stock ? req.body.stock : 1;
            return next();
        }
    } catch (error) {
        throw error;
    }
}

export default isValidProduct;
