function isValidProduct(req, res, next) {
    try {
        const CATEGORIES = ["mochilas", "riñoneras"];
        const { title, price, stock, category } = req.body;
        if (!title || title === "") {
            const error = new Error("Title is required");
            error.statusCode = 400;
            throw error;
        } else if (price && isNaN(price)) {
            const error = new Error("Price must be a number");
            error.statusCode = 400;
            throw error;
        } else if (stock && isNaN(stock)) {
            const error = new Error("Stock must be a number");
            error.statusCode = 400;
            throw error;
        } else if (category && !CATEGORIES.includes(category.toLowerCase())) {
            const error = new Error("Categories must be 'mochilas' or 'riñoneras'");
            error.statusCode = 400;
            throw error;
        } else {
            req.body.category = req.body.category ? req.body.category.toLowerCase() : "mochilas";
            req.body.photo = req.body.photo
                ? req.body.photo
                : "https://placehold.jp/30/7e7f91/ffffff/300x200.png?text=" +
                  req.body.category.toUpperCase().replace(" ", "_");
            req.body.price = req.body.price ? parseFloat(req.body.price) : 1;
            req.body.stock = req.body.stock ? parseInt(req.body.stock) : 1;
            return next();
        }
    } catch (error) {
        throw error;
    }
}

export default isValidProduct;
