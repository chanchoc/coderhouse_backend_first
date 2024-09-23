import fs from "fs";
import crypto from "crypto";

class ProductsManager {
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
    async readAll(category) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const allProducts = JSON.parse(data);
            if (category) {
                const filteredProducts = allProducts.filter((product) => product.category === category);
                return filteredProducts;
            }
            return allProducts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async readOne(id) {
        try {
            const allProducts = await this.readAll();
            const oneProduct = allProducts.filter((product) => product.id === id);
            return oneProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async create(product) {
        try {
            product.id = crypto.randomBytes(12).toString("hex");
            const allProducts = await this.readAll();
            allProducts.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, 2));
            return product.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async update(id, product) {
        try {
            const allProducts = await this.readAll();
            const index = allProducts.findIndex((product) => product.id === id);
            if (index === -1) {
                return null;
            }
            allProducts[index] = { ...allProducts[index], ...product };
            await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, 2));
            return allProducts[index];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const allProducts = await this.readAll();
            const filteredProducts = allProducts.filter((product) => product.id !== id);
            if (allProducts.length === filteredProducts.length) {
                return null;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
            return `Product with Id ${id} was deleted successfully`;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const productsManager = new ProductsManager("./src/data/files/products.json");
export default productsManager;
