const db = require("../db");

const getProduct = async () => {
    const data = await db.query(`select id, name, description, price, quantity, created_at, to_char(created_at, 'dd-mm-yyyy') as date from product`);
    return data.rows;
};

module.exports = { getProduct };
