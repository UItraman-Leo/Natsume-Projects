const NewService = require("../../services/admin/NewService")
const JWT = require("../../util/JWT");

const NewController = {
    add: async (req, res) => {
        // 信息字段
        const {
            title,
            content,
            category,
            isPublish,
            date
        } = req.body
        const cover = req.file == undefined ? '' : `/newuploads/${req.file.filename}`
        //   调用services模块更新数据
        await NewService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            date,
        })
        res.send({
            ActionType: "OK",
        })

    },
    getList:async (req,res) =>{
        await NewService.getList()
            .then(data =>{
                res.send({
                    ActionType: "OK",
                    data
                })
            })
    }
}

module.exports = NewController