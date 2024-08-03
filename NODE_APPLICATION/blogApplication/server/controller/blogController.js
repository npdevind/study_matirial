import * as blogModal from "../model/blogModel.js";

export const getBlogCategoryList = async (req, res) => {
    try {
        const data = await blogModal.getBlogCategoryList();
        res.send({
            status: true,
            data: data,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};

export const addNewBlogCategory = async (req, res) => {
    try {
        const { categoryName, isActive } = req.body;
        const data = await blogModal.addNewBlogCategory({ categoryName: categoryName, isActive: isActive });
        res.send({
            status: true,
            inserted_id: data.id,
            message: data.msg,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};

export const updateBlogCategory = async (req, res) => {
    try {
        const { categoryName, isActive } = req.body;
        const data = await blogModal.updateBlogCategory({ id: req.body.id, categoryName: categoryName, isActive: isActive });
        res.send({
            status: true,
            updated_id: data.id,
            message: data.msg,
        });
    } catch (error) {
        res.send({
            status: false,
            message: error.message,
        });
    }
};
