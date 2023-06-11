const FrontDeskProductsServices = require("../../services/web/FrontDeskProductsServices")

const FrontDeskProductController = {
    getlist:async (req,res)=>{
        console.log("22前台",req.query.id)
        await FrontDeskProductsServices.getlist()
            .then(data=>{
                console.log(data)
                res.send({
                    ActionType: "OK",
                    data
                })
            })

    }
}


module.exports = FrontDeskProductController
