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
    try {
        const insertNewData = await productModel.insertNewModel(req.body);
        if (insertNewData.status) {
            req.flash("success", insertNewData.msg);
            res.redirect("/admin/product");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/product");
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await productModel.deleteProduct(req.params.id);
        if (deleteProduct) {
            req.flash("success", "Successfully deleted");
            return res.redirect("/admin/product");
        }
    } catch (error) {
        req.flash("error", error.message);
    }
};

module.exports = {
    productList,
    addProduct,
    addNewProduct,
    deleteProduct,
};
