import crypto from "crypto";

class ProductsManager {
    static #all = [
        {
            id: crypto.randomBytes(12).toString("hex"),
            category: "shoes",
            title: "Shoes #1",
            price: 100,
            stock: 1000,
            photo: "shoes1.png",
        },
        {
            id: crypto.randomBytes(12).toString("hex"),
            category: "shoes",
            title: "Shoes #2",
            price: 200,
            stock: 2000,
            photo: "shoes2.png",
        },
    ];
    create(data) {
        const promesa = new Promise((resolve, reject) => {
            try {
                data.id = crypto.randomBytes(12).toString("hex");
                ProductsManager.#all.push(data);
                console.log("Successfully created -> Id #" + data.id);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
        return promesa;
    }
    readAll() {
        try {
            const promesa = new Promise((resolve, reject) => {
                if (ProductsManager.#all.length === 0) {
                    reject("Empty list of products");
                }
                resolve(ProductsManager.#all);
            });
            return promesa;
        } catch (error) {
            reject(error);
        }
    }
}

async function test() {
    try {
        const manager = new ProductsManager();
        await manager.create({
            category: "shoes",
            title: "Shoes #1",
            price: 100,
            stock: 1000,
            photo: "shoes1.png",
        });
        await manager.create({
            category: "shoes",
            title: "Shoes #1",
            price: 100,
            stock: 1000,
            photo: "shoes1.png",
        });
        await manager.readAll();
    } catch (error) {
        console.log(error);
    }
}

//test();

const productsManager = new ProductsManager();
export default productsManager;
