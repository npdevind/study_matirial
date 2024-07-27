const productModel = require("../models/productModel");
const moment = require("moment");
const multiparty = require("multiparty");

const productList = async (req, res) => {
    const getData = await productModel.getProduct();
    console.log(getData);
    res.render("product/list", {
        data: getData,
        moment: moment,
    });
};

const addProduct = async (req, res) => {
    res.render("product/add");
};

const addEditProduct = async (req, res) => {
    const id = req.params.id;
    if (id) {
        const getProductData = await productModel.getProductData(req.params.id);
        res.render("product/addeditProduct", {
            title: "Edit Product",
            data: getProductData,
            moment: moment,
        });
    } else {
        res.render("product/addeditProduct", {
            title: "Add Product",
            data: [],
            moment: moment,
        });
    }
};

const addNewProduct = async (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
        try {
            if (err) throw Error(err);
            const insertNewData = await productModel.insertNewModel(fields, files);
            if (insertNewData.status) {
                req.flash("success", insertNewData.msg);
                res.redirect("/admin/product");
            }
        } catch (error) {
            req.flash("error", error.message);
            res.redirect("/admin/add-product");
        }
    });
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

const editPageOpen = async (req, res) => {
    const getProductData = await productModel.getProductData(req.params.id);
    res.render("product/edit", {
        data: getProductData,
        moment: moment,
    });
};

const updateProduct = async (req, res) => {
    try {
        const updateProduct = await productModel.updateProduct(req.body);
        if (updateProduct.status) {
            req.flash("success", updateProduct.msg);
            res.redirect("/admin/product");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/product");
    }
};

module.exports = {
    productList,
    addProduct,
    addNewProduct,
    deleteProduct,
    editPageOpen,
    updateProduct,
    addEditProduct,
};
