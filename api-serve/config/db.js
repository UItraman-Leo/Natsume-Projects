/**
 * @param {*} success 数据库连接成功的回调函数
 * @param {*} error 数据库连接失败的回调函数
 */
    // 导入
const mongoose = require('mongoose')
// 导入url配置项
const {DBHOST, DBPORT, DBNAME} = require('../config/keys.js')
// 连接数据库
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
// 成功回调
mongoose.connection.once('open', () => {
    console.log("数库连接成功")
})
// 失败回调
mongoose.connection.on('error', () => {
    console.log("数据库连接失败")
})
// 关闭回调
mongoose.connection.on('close', () => {
    console.log('关闭连接');
})
