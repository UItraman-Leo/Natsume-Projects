const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")
/**
 * @author: Natsume
 * @name:
 * @annotation:
 */

const UserController = {
    login: async (req, res) => {
        // console.log(req.body)
        // 将 req.body 获取到的数据，传给数据层处理，如果数据库查询不到，表示数组为0
        let result = await UserService.login(req.body)

        //将返回的数据进行处理,如果result数组长度为0，表示错误
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码不正确"
            })
        } else {
            // 到这里表示数据库是能查到这个信息，所以生成token
            const token = JWT.generate({
                _id: result[0],
                username: result[0].username,
            }, "1d")
            // 往前端传入token
            res.header("Authorization", token)
            res.send({
                code: "1",
                ActionType: "login-OK",
                data: {
                    nickname: result[0].nickname,
                    username: result[0].username,
                    password: {
                        type: String,
                        required: true
                    },
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction ? result[0].introduction : '简介',   //简介
                    avatar: result[0].avatar,        //头像
                    role: result[0].role ? '普通' : '管理员',           //身份，0，1，2表示(管理，普通。。。)
                    date: result[0].date
                }
            })
        }
        return;
    },
    upload: async (req, res) => {
        // console.log("123", req.file)
        // 信息字段
        const {nickname, gender, introduction} = req.body
        // 头像字段
        const avatar = req.file == undefined ? '' : `/uploads/${req.file.filename}`
        // 通过token拿到_id字段
        const token = req.headers["authorization"].split(" ")[1]
        let payload = JWT.verify(token)
        //   调用services模块更新数据
        await UserService.upload({
            _id: payload._id,
            nickname,
            gender: Number(gender),
            introduction,
            avatar
        })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    nickname,
                    introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    nickname,
                    introduction,
                    gender: Number(gender)
                }
            })
        }

    },
    useradd: async (req, res) => {
        // 信息字段
        const {
            nickname,
            username,
            password,
            role,
            gender,
            introduction
        } = req.body
        // 头像字段
        const avatar = req.file == undefined ? '' : `/uploads/${req.file.filename}`
        await UserService.useradd({
            nickname,
            username,
            password,
            role: Number(role),
            gender: Number(gender),
            introduction,
            avatar
        })
            .then(data => {
                    // console.log("111", data.lastErrorObject.updatedExisting)
                    if (data.lastErrorObject.updatedExisting) {
                        //如果为true表示有这条数据
                        res.send({
                            ActionType: "fail",
                        })
                    } else {
                        res.send({
                            ActionType: "OK",
                        })
                    }
                }
            )
    },
    list: async (req, res) => {
        await UserService.list(req.params).then(data => {
            res.send({
                ActionType: "OK",
                data
            })
        })
    },
    delete: async (req, res) => {
        await UserService.delete({_id: req.params.id})
            .then(data => {
                res.send({
                    ActionType: "OK",
                })
            })
    },
    put: async (req, res) => {
        await UserService.put(req.body)
            .then(() => {
                res.send({
                    ActionType: "OK"
                })
            })
    }

}

module.exports = UserController