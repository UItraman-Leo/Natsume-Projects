/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema
// 类型限制
const NewType = {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: Number,
    isPublish: Number,
    cover: String,
    date: Date,
}
const NewModel = mongoose.model("new", new Schema(NewType))

module.exports = NewModel