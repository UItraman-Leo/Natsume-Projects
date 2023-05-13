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
        const cover = req.file === undefined ? '' : `/newuploads/${req.file.filename}`
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
        await NewService.getList({_id: req.params.id})
            .then(data =>{
                res.send({
                    ActionType: "OK",
                    data
                })
            })
    },
    switch : async (req,res) =>{
        await NewService.switch(req.body)
            .then(() =>{
                // console.log(data)
                res.send({
                    ActionType: "OK",
                })
            })
    },
    setDel:async (req,res) =>{
        // console.log(req.params)
        await NewService.setDel(req.params.id)
            .then(()=>{
                res.send({
                    ActionType: "OK",
                })
            })
    },
    setList : async (req,res) =>{
        // console.log(req.body._id)
        const {
            _id,
            title,
            content,
            category,
        } = req.body
        const cover = req.file === undefined ? '' : `/newuploads/${req.file.filename}`
        await NewService.setList({
            _id,
            title,
            content,
            category: Number(category),
            cover,
        })
        res.send({
            ActionType: "OK",
        })
    }

}

module.exports = NewController