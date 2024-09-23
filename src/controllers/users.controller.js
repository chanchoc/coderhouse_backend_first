import usersManager from "../data/users.manager.js";

async function getAllUsers(req, res, next) {
    try {
        const { role } = req.query;
        let response;
        if (!role) {
            response = await usersManager.readAll();
        } else {
            response = await usersManager.readAll(role);
        }
        if (response.length > 0) {
            return res.status(200).json({ message: "Success reading users", response });
        } else if (!role) {
            const error = new Error("Users not found");
            error.statusCode = 404;
            throw error;
        } else {
            const error = new Error(`Users with role ${role} not found`);
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
        const response = await usersManager.readOne(uid);
        if (response.length > 0) {
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
        const response = await usersManager.create(user);
        return res.status(201).json({ message: "Success creating user", response });
    } catch (error) {
        return next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const { uid } = req.params;
        const user = req.body;
        const response = await usersManager.update(uid, user);
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
        console.log(uid);
        const response = await usersManager.delete(uid);
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

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
