const ProductModel = require("../../models/ProductModel");

const FrontDeskProductsServices={
    getlist:async ()=>{
        // console.log(ProductModel.find({category: id}))
        return ProductModel.find()

    }
}




module.exports = FrontDeskProductsServices