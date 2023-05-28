/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema
// 类型限制
const NewType = {
    name: {
        type: String,
        required: true
    },
    grouping: {
        type: String,
        required: true
    },
    img: String,
    Link: String,
    date: Date,
}
const ProductModel = mongoose.model("product", new Schema(NewType))

module.exports = ProductModel