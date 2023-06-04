const FrontDeskNewsServices = require("../../services/web/FrontDeskNewsServices")

const FrontDeskNewsController = {
    getlist:async (req,res)=>{
        // console.log("22前台",req.query.id)
        await FrontDeskNewsServices.getlist(Number(req.query.id))
            .then(data=>{
                console.log(data)
                res.send({
                    ActionType: "OK",
                    data
                })
            })

    }
}


module.exports = FrontDeskNewsController
