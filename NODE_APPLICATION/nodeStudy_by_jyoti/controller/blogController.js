const blogModel = require("../model/blogModel");
const blogList = async (req, res) =>{
    const getData = await blogModel.getBlogs();
     
    if(getData.length){
        res.render("blog/blogList", {
            blogs: null,
        });
    }else{
        var data = JSON.stringify(getData.rows);
        data = JSON.parse(data);
        
        res.render("blog/blogList", {
            blogs: data,
            moment: moment,
        });
    }
   
}

module.exports = {
    blogList,
}