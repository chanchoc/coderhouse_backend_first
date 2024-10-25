import { Schema, model, Types } from "mongoose";

const collection = "carts";
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
    product_id: { type: Types.ObjectId, ref: "products", required: true, index: true },
    quantity: { type: Number, min: 0, required: true },
    price: { type: Number, min: 0, required: true },
    state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"] },
});

schema.pre("find", function () {
    this.populate("user_id", "email");
    this.populate("product_id", "title photo category stock");
});

schema.pre("findOne", function () {
    this.populate("user_id", "email");
    this.populate("product_id", "title photo category stock");
});

schema.pre("findOneAndUpdate", function () {
    this.populate("user_id", "email");
    this.populate("product_id", "title photo category stock");
});

schema.pre("findOneAndDelete", function () {
    this.populate("user_id", "email");
    this.populate("product_id", "title photo category stock");
});

const Cart = model(collection, schema);
export default Cart;
