function isValidUser(req, res, next) {
    try {
        const ROLES = [0, 1, 2];
        const { email, password, role } = req.body;
        const emailCheck = /\S+@\S+\.\S+/;
        if (!email || email === "" || !emailCheck.test(email)) {
            const error = new Error("Valid email is required");
            error.statusCode = 400;
            throw error;
        } else if (!password || password === "") {
            const error = new Error("Password is required");
            error.statusCode = 400;
            throw error;
        } else if (role && !ROLES.includes(parseInt(role))) {
            const error = new Error("Valid role is required");
            error.statusCode = 400;
            throw error;
        } else {
            req.body.photo = req.body.photo
                ? req.body.photo
                : "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
            req.body.role = req.body.role ? parseInt(req.body.role) : 0;
            return next();
        }
    } catch (error) {
        throw error;
    }
}

export default isValidUser;
