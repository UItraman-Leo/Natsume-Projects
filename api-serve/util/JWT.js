const jsonwebtoken = require("jsonwebtoken")
/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
// 密钥
const secret = "xiamu"
const JWT = {
    // 生成token
    generate(value, exprires) {
        return jsonwebtoken.sign(value, secret, {expiresIn: exprires})
    },
    verify(token) {
        // 超过时间会直接报错，所以在这里捕获异常
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return 'false'
        }
    }
}
// const token = JWT.generate({name: "xiamu"}, "10s")
// console.log(JWT.verify(token))
// setTimeout(() => {
//     console.log(JWT.verify(token))
// }, 11000)
module.exports = JWT