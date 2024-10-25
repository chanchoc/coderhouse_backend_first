import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema({
    title: { type: String, required: true, index: true },
    photo: { type: String, default: "https://placehold.jp/30/7e7f91/ffffff/300x200.png" },
    category: { type: String, default: "mochilas", enum: ["mochilas", "riñoneras"], index: true },
    price: { type: Number, default: 1, min: 0 },
    stock: { type: Number, default: 1, min: 0 },
});

schema.plugin(mongoosePaginator);

const Product = model(collection, schema);
export default Product;
