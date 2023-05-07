/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
const mongoose = require("mongoose")
const Schema = mongoose.Schema
// user模型 ==> user集合

// 类型限制
const UserType = {
    nickname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: Number,     //性别，0，1，2表示
    introduction: String,   //简介
    avatar: String,          //头像
    role: Number,            //权限，0，1，2表示(管理，用户，游客)
    date: Date,
}
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel