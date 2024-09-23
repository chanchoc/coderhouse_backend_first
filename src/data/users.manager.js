import fs from "fs";
import crypto from "crypto";

class UsersManager {
    constructor(path) {
        this.path = path;
        this.exists();
    }
    exists() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            fs.writeFileSync(this.path, JSON.stringify([]));
            console.log("File created in path: " + this.path);
        } else {
            console.log("File already exists on path: " + this.path);
        }
    }
    async readAll(role) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const allUsers = JSON.parse(data);
            if (role) {
                const filteredUsers = allUsers.filter((user) => String(user.role) === String(role));
                return filteredUsers;
            }
            return allUsers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async readOne(id) {
        try {
            const allUsers = await this.readAll();
            const oneUser = allUsers.filter((user) => user.id === id);
            return oneUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async create(user) {
        try {
            user.id = crypto.randomBytes(12).toString("hex");
            const allUsers = await this.readAll();
            allUsers.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
            return user.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async update(id, user) {
        try {
            const allUsers = await this.readAll();
            const index = allUsers.findIndex((user) => user.id === id);
            if (index === -1) {
                return null;
            }
            allUsers[index] = { ...allUsers[index], ...user };
            await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
            return allUsers[index];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const allUsers = await this.readAll();
            const filteredUsers = allUsers.filter((user) => user.id !== id);
            if (allUsers.length === filteredUsers.length) {
                return null;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(filteredUsers, null, 2));
            return `User with Id ${id} was deleted successfully`;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const usersManager = new UsersManager("./src/data/files/users.json");
export default usersManager;
