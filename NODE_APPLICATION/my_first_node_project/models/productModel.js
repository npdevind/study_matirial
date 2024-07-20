const db = require("../db");

const getProduct = async () => {
    const data = await db.query(
        `select id, name, description, price, quantity, created_at, to_char(created_at, 'dd-mm-yyyy') as date from product order by id asc`
    );
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

const getProductData = async (id) => {
    const queryString = `select * from product where id = ${id}`;
    const data = await db.query(queryString);
    return data.rows[0];
};

const updateProduct = async (body) => {
    const queryString = `update product set name = '${body.name}', description = '${body.description}', price = ${body.price}, quantity = ${body.quantity}, created_at = '${body.date}' where id = ${body.edit_id}`;
    const data = await db.query(queryString);
    if (!data) {
        return {
            status: false,
            msg: "Problem",
        };
    } else {
        return {
            status: true,
            msg: "product successfully updated",
        };
    }
};

module.exports = { getProduct, insertNewModel, deleteProduct, getProductData, updateProduct };
