const ProductService = require("../../services/admin/ProductService")
const JWT = require("../../util/JWT")


const ProductController = {
    // 添加
    add: async (req,res) =>{
        // console.log("req",req.body)
        await ProductService.add(req.body)
            .then(() => {
                res.send({
                    ActionType: "OK",
                })
                }
            )
    },
    // 获取
    getlist:async (req,res)=>{
        await ProductService.getlist()
            .then((data) => {
                    res.send({
                        ActionType: "OK",
                        data
                    })
                }
            )
    },
    // 删除
    setDel:async (req,res)=>{
           await ProductService.setDel(req.params.id)
               .then(()=>{
                   res.send({
                       ActionType: "OK",
                   })
               })
    },
    // 修改
    put:async  (req,res)=>{
        // console.log(req.body)
        await ProductService.put(req.body)
            .then(()=>{
                res.send({
                    ActionType: "OK",
                })
            })
}
}

module.exports = ProductController