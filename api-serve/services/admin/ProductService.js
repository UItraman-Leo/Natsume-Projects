const ProductModel = require("../../models/ProductModel");
/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
const ProductService = {
    // 添加一个图标
    add: async ({name,grouping,img,Link}) =>{
        // console.log(name,grouping,img,Link)
        return ProductModel.create({
            name,grouping,img,Link
        })
    },
    // 获取所有
    getlist:async ()=>{
        return ProductModel.find({},[
            'name',
            'grouping',
            'img',
            'Link'])

    },
    // 删除
    setDel:async (_id)=>{
        console.log(_id)
        return ProductModel.deleteOne({_id})
    },
    // 修改
    put:async (body)=>{
        const {_id,name,grouping,img,Link} = body
        return ProductModel.updateOne({_id},{
            name,
            grouping,
            img,
            Link
        })
    }
}

module.exports = ProductService