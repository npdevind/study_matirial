const userModel = require("../model/userModel");
const moment = require("moment");


const userList = async (req, res) =>{
    const getData = await userModel.getUsers();
     
    if(getData.length){
        res.render("user/userList", {
            users: null,
        });
    }else{
        var data = JSON.stringify(getData.rows);
        data = JSON.parse(data);
        
        res.render("user/userList", {
            users: data,
            moment: moment,
        });
    }
   
}
const addUser = async(req,res)=>{
    if(req.params.id){
        const getUserByID = await userModel.getUserById(req.params.id);
        res.render("user/userAdd",{
            data : getUserByID,
            moment : moment
        })
    }else{
        res.render("user/userAdd",{
            data : '',
        })
    }
}
const addUpdateUser = async(req,res) =>{
    // console.log(req.body);
    try {
        const addUpdateId = await userModel.addUpdateUser(req.body);
        console.log(addUpdateId);
        if (addUpdateId.status) {
            req.flash("success", addUpdateId.msg);
            res.redirect("/user/user-list");
        }
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/user/user-list");
    }
}
const deleteUser = async (req, res) => {
    
    try {
        const deleteUserData = await userModel.deleteUser(req.params.id);
        if (deleteUserData) {
            req.flash("success", "Successfully deleted");
            res.redirect("/user/user-list");
        }
    } catch (error) {
        req.flash("error", error.message);
    }
};

module.exports = {
    userList,
    addUser,
    addUpdateUser,
    deleteUser
}