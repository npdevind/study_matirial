const productModel = require("../model/productModel");
const moment = require("moment");


const productList = async (req, res) =>{
    const getData = await productModel.getProducts();
     
    if(getData.length){
        res.render("list", {
            data: null,
        });
    }else{
        var data = JSON.stringify(getData.rows);
        data = JSON.parse(data);
        
        res.render("list", {
            data: data,
            moment: moment,
        });
    }
   
}

const addProduct = async (req, res) => {
    if(req.params.id){
        const getProductData = await productModel.getProductData(req.params.id);
        res.render("add", {
            data: getProductData,
            moment: moment,
        });
    }else{
        res.render("add", {
            data: '',
        });
    }
   
};

const addNewProduct = async (req, res) => {
   
    try {
        const insertNewData = await productModel.insertNewModel(req.body, req.file);
        if (insertNewData.status) {
            req.flash("success", insertNewData.msg);
            res.redirect("/admin/product");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/product");
    }
};
const updateProduct = async (req, res) => {
   
    try {
        const updateProduct = await productModel.updateProduct(req.body, req.file);
        if (updateProduct.status) {
            req.flash("success", updateProduct.msg);
            res.redirect("/admin/product");
        }
    } catch (error) {
        console.log(error.message);
        req.flash("error", error.message);
        res.redirect("/admin/product");
    }
};

const deleteProduct = async (req, res) => {
    //const { name, price } = req.body;
    
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
    updateProduct,
    deleteProduct
}