const NewModel = require("../../models/NewModel");
/**
 * @author: Natsume
 * @name:
 * @annotation:
 */
const NewService = {
    add: async ({
                    title,
                    content,
                    category,
                    isPublish,
                    cover,
                    date
                }) => {
        return NewModel.create({
            title,
            content,
            category,
            isPublish,
            cover,
            date
        })
    },
    getList : async ({_id})=>{
        // console.log("@@",_id?'222':"111")
        return _id?NewModel.find({_id}):NewModel.find({})
    },

    switch : async ({id,isPublish})=>{
        // console.log(id,isPublish)
        return NewModel.updateOne({_id:id},{
            isPublish
        })
    },
    setDel:async (_id)=>{
        // console.log(_id)
        return NewModel.deleteOne({_id})
    },
    setList:async (item) =>{
        // console.log(item)
        const {_id,title, content, category, cover} = item
        // 判断是否有新传的头像
        if (cover){
            return NewModel.updateOne({_id},{
                title,
                content,
                category,
                cover
            })
        }else{
            return NewModel.updateOne({_id},{
                title,
                content,
                category
            })
        }
    }
}

module.exports = NewService