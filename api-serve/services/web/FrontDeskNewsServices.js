const NewModel = require("../../models/NewModel");

const FrontDeskNewsServices={
    getlist:async (id)=>{
        console.log(NewModel.find({category: id}))
        // isPublish  等于 0排除,
        return NewModel.find({'category': id,isPublish:{$gt:0}})

    }
}




module.exports = FrontDeskNewsServices