const productModel = require("../models/productModel");

const productList = async (req, res) => {
    const getData = await productModel.getProduct();
    res.render("product/list", {
        data: getData,
    });
};

module.exports = {
    productList,
};
