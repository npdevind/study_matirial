const userModel = require("../models/userModel");
const moment = require("moment");
const multiparty = require("multiparty");

const userList = async (req, res) => {
    try {
        const getData = await userModel.getUser();
        res.render("user/list", {
            data: getData,
            moment: moment,
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/user");
    }
};

const addUser = (req, res) => {
    res.render("user/add");
};

const addNewUser = async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
    try {
        if (err) throw Error(err);
        const insertNewData = await userModel.insertNewModel(fields, files);
        if (insertNewData.status) {
            req.flash("success", insertNewData.msg);
            res.redirect("/admin/user");
        } else {
            throw new Error("Failed to add new user");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/user");
    }
});
};

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await userModel.deleteUser(req.params.id);
        if (deleteUser) {
            req.flash("success", "Successfully deleted");
            res.redirect("/admin/user");
        } else {
            throw new Error("Failed to delete user");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/user");
    }
};

const editPageOpen = async (req, res) => {
    try {
        const getUserData = await userModel.getUserData(req.params.id);
        res.render("user/edit", {
            data: getUserData,
            moment: moment,
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/user");
    }
};

const updateUser = async (req, res) => {
    try {
        const updateUser = await userModel.updateUser(req.body);
        if (updateUser.status) {
            req.flash("success", updateUser.msg);
            res.redirect("/admin/user");
        } else {
            throw new Error("Failed to update user");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/admin/user");
    }
};

module.exports = {
    userList,
    addUser,
    addNewUser,
    deleteUser,
    editPageOpen,
    updateUser,
};
