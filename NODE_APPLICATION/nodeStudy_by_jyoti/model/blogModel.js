const db = require("../db");

const getBlogs = async () =>{
    
    try {
        const products = await db.query(`select * from users` );
        
        if (products !== null) {
          if (products.rowCount > 0) {
            return products;
          }
        }
        return null;
       
      }
      catch (error) {
        //  console.log(error);
        return error;
      }
}

module.exports = { getBlogs };