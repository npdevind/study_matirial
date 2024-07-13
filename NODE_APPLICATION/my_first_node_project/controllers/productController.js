const productModel = require("../models/productModel");
const moment = require("moment");

const productList = async (req, res) => {
    const getData = await productModel.getProduct();
    res.render("product/list", {
        data: getData,
        moment: moment,
    });
};

const addProduct = async (req, res) => {
    res.render("product/add");
};

const addNewProduct = async (req, res) => {
    console.log(" I am here");
    console.log(req.body);
};

module.exports = {
    productList,
    addProduct,
    addNewProduct,
};
