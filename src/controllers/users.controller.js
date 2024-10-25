import usersMongoManager from "../data/mongo/managers/user.manager.js";

async function getAllUsers(req, res, next) {
    try {
        const filter = req.query;
        const response = await usersMongoManager.readAll(filter);
        if (response.length > 0) {
            return res.status(200).json({ message: "Success reading users", response });
        } else {
            const error = new Error("Users not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function getUser(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersMongoManager.readOne(uid);
        if (response) {
            return res.status(200).json({ message: "Success reading user", response });
        } else {
            const error = new Error(`User with Id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const user = req.body;
        const response = await usersMongoManager.create(user);
        return res.status(201).json({ message: "Success creating user", response });
    } catch (error) {
        return next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const { uid } = req.params;
        const user = req.body;
        const response = await usersMongoManager.update(uid, user);
        if (!response) {
            const error = new Error(`User with Id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success updating user", response });
    } catch (error) {
        return next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { uid } = req.params;
        const response = await usersMongoManager.delete(uid);
        if (!response) {
            const error = new Error(`User with Id ${uid} not found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ message: "Success deleting user", response });
    } catch (error) {
        return next(error);
    }
}

function registerView(req, res, next) {
    try {
        return res.render("register");
    } catch (error) {
        return next(error);
    }
}

async function createUserView(req, res, next) {
    try {
        const user = req.body;
        await usersMongoManager.create(user);
        return res.render("login");
    } catch (error) {
        return next(error);
    }
}

function loginView(req, res, next) {
    try {
        return res.render("login");
    } catch (error) {
        return next(error);
    }
}

async function checkLoginView(req, res, next) {
    try {
        const { email, password } = req.body;
        const allUsers = await usersMongoManager.readAll();
        const user = allUsers.filter((user) => user.email === email && user.password === password);
        if (user.length > 0) {
            req.session.user = user[0];
            req.session.user_id = user[0]._id;
            req.session.isAuthenticated = true;
            return res.redirect("/");
        }
        return res.render("login");
    } catch (error) {
        return next(error);
    }
}

async function profileView(req, res, next) {
    try {
        if (req.session.isAuthenticated) {
            const user = await usersMongoManager.readOne(req.session.user._id);
            return res.render("profile", { user });
        }
        return res.redirect("/");
    } catch (error) {
        return next(error);
    }
}

function logoutView(req, res, next) {
    try {
        if (req.session.isAuthenticated) {
            req.session.destroy();
        }
        return res.redirect("/");
    } catch (error) {
        return next(error);
    }
}

export {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerView,
    createUserView,
    loginView,
    checkLoginView,
    profileView,
    logoutView,
};
