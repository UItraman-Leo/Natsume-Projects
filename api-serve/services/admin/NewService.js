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
    getList : async ()=>{
        return NewModel.find()
    }
}

module.exports = NewService