function isValidCart(req, res, next) {
    try {
        const STATES = ["reserved", "paid", "delivered"];
        const { quantity, price, state } = req.body;
        if (!quantity || isNaN(quantity) || quantity < 0) {
            const error = new Error("Quantity must be a number bigger than 0");
            error.statusCode = 400;
            throw error;
        } else if (!price || isNaN(price) || price < 0) {
            const error = new Error("Price must be a number bigger than 0");
            error.statusCode = 400;
            throw error;
        } else if (state && !STATES.includes(state.toLowerCase())) {
            const error = new Error("States must be 'reserved', 'paid' or 'delivered'");
            error.statusCode = 400;
            throw error;
        } else {
            req.body.state = req.body.state ? req.body.state.toLowerCase() : "reserved";
            return next();
        }
    } catch (error) {
        throw error;
    }
}

export default isValidCart;
