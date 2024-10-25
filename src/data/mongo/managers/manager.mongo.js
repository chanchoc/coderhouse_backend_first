import { Types } from "mongoose";

class MongoManager {
    constructor(model) {
        this.model = model;
    }
    readAll = async (filter) => {
        try {
            const all = await this.model.find(filter, "-__v").lean();
            return all;
        } catch (error) {
            throw error;
        }
    };
    paginate = async (filter, opts) => {
        try {
            opts.lean = true;
            const paginated = await this.model.paginate(filter, opts);
            return paginated;
        } catch (error) {
            throw error;
        }
    };
    readOne = async (id) => {
        try {
            if (Types.ObjectId.isValid(id)) {
                const one = await this.model.findOne({ _id: id }, "-__v").lean();
                return one;
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
    create = async (data) => {
        try {
            const created = await this.model.create(data);
            return created;
        } catch (error) {
            throw error;
        }
    };
    update = async (id, data) => {
        try {
            if (Types.ObjectId.isValid(id)) {
                const opts = { new: true };
                const updated = await this.model.findOneAndUpdate({ _id: id }, data, opts);
                return updated;
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
    delete = async (id) => {
        try {
            if (Types.ObjectId.isValid(id)) {
                const deleted = await this.model.findOneAndDelete({ _id: id });
                return deleted;
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
    deleteMany = async (filter) => {
        try {
            const deleted = await this.model.deleteMany(filter);
            return deleted;
        } catch (error) {
            throw error;
        }
    };
    calculateTotal = async (id) => {
        try {
            if (Types.ObjectId.isValid(id)) {
                const total = await this.model.aggregate([
                    { $match: { user_id: new Types.ObjectId(id) } },
                    {
                        $lookup: {
                            foreignField: "_id",
                            from: "products",
                            localField: "product_id",
                            as: "product_id",
                        },
                    },
                    { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"] } } },
                    { $set: { subtotal: { $multiply: ["$quantity", "$price"] } } },
                    { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
                    { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() } },
                    {
                        $lookup: {
                            foreignField: "_id",
                            from: "users",
                            localField: "user_id",
                            as: "user_id",
                        },
                    },
                    { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user_id", 0] }, "$$ROOT"] } } },
                    { $project: { _id: 0, user_id: 0, password: 0, role: 0, __v: 0 } },
                ]);
                return total;
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
}

export default MongoManager;
