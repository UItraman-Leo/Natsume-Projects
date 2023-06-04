const NewModel = require("../../models/NewModel");

const FrontDeskNewsServices={
    getlist:async (id)=>{
        // console.log(NewModel.find({category: id}))
        return NewModel.find({'category': id})

    }
}




module.exports = FrontDeskNewsServices