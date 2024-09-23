function isValidUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const emailCheck = /\S+@\S+\.\S+/;
        if (!email || email === "" || !emailCheck.test(email)) {
            const error = new Error("Valid email is required");
            error.statusCode = 400;
            throw error;
        } else if (!password || password === "") {
            const error = new Error("Password is required");
            error.statusCode = 400;
            throw error;
        } else {
            req.body.photo = req.body.photo
                ? req.body.photo
                : "./files/images/users/" + req.body.email.split("@")[0].replace(" ", "_").replace(".", "_") + ".png";
            req.body.role = req.body.role ? req.body.role : 0;
            return next();
        }
    } catch (error) {
        throw error;
    }
}

export default isValidUser;
