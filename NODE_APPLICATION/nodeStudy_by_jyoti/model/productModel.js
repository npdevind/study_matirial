const db = require("../db");

const getProducts = async () =>{
    
    try {
        const products = await db.query(`select * from product` );
        // console.log(products.rows);
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
const insertNewModel = async (body,file) => {
 
  const { filename, path } = file;
  const { name, description, price, quantity, date } = body;
  const queryString = `insert into product (name, description, price, quantity, created_at) values (
  '${name}', '${description}', ${price}, ${quantity}, '${date}') returning id`;
  const data = await db.query(queryString);
  if (!data) {
      return {
          status: false,
          msg: "Problem",
          res: "",
      };
  } else {
    const queryStringImage = `insert into product_image (filename, path, product_id) values (
      '${filename}', '${path}', ${data.rows[0].id}) returning id`;
      const imageInsert = await db.query(queryStringImage);
      return {
          status: true,
          res: data.rows[0].id,
          msg: "Product successfully saved",
      };
  }
};
const getProductData = async (id) => {
  const queryString = `select * from product where id = ${id}`;
  const data = await db.query(queryString);
  return data.rows[0];
};

const updateProduct = async (body,file) => {
  console.log(file);
  const { filename, path } = file;
  console.log(filename);
  const queryString = `update product set name = '${body.name}', description = '${body.description}', price = ${body.price}, quantity = ${body.quantity}, created_at = '${body.date}' where id = ${body.edit_id}`;
  // console.log(queryString);
  const data = await db.query(queryString);
 
  if (!data) {
      return {
          status: false,
          msg: "Problem",
      };
  } else {
    const queryStringImage = `insert into product_image (filename, path, product_id) values (
      '${filename}', '${path}', ${body.edit_id}) returning id`;
      const imageInsert = await db.query(queryStringImage);
      return {
          status: true,
          msg: "product successfully updated",
      };
  }
};
const deleteProduct = async (id) => {
  const queryString = `delete from product where id = ${id}`;
  await db.query(queryString);
  return true;
};

module.exports = { getProducts,
  insertNewModel,
  getProductData,
  updateProduct,
  deleteProduct };