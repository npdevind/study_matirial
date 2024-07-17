const db = require("../db");

const getProduct = async () => {
    const data = await db.query(`select id, name, description, price, quantity, created_at, to_char(created_at, 'dd-mm-yyyy') as date from product`);
    return data.rows;
};

const insertNewModel = async (body) => {
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
        return {
            status: true,
            res: data.rows[0].id,
            msg: "product successfully saved",
        };
    }
};

const deleteProduct = async (id) => {
    const queryString = `delete from product where id = ${id}`;
    await db.query(queryString);
    return true;
};

module.exports = { getProduct, insertNewModel, deleteProduct };
