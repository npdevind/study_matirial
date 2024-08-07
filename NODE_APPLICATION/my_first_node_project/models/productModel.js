const db = require("../db");
const fs = require("fs-extra");

const getProduct = async () => {
    const data = await db.query(
        `select id, name, description, price, quantity, created_at, to_char(created_at, 'dd-mm-yyyy') as date, file_path from product order by id asc`
    );
    return data.rows;
};

const insertNewModel = async (fields, files) => {
    const { name, description, price, quantity, date } = fields;

    const imageName = files.image[0].originalFilename;
    const imageOldPath = files.image[0].path;
    var newPath = "public/upload/images/" + imageName;

    await new Promise((resolve, reject) => {
        fs.copy(imageOldPath, newPath, function (err, res) {
            if (!err) {
                resolve("yes");
            } else {
                reject("NO");
            }
        });
    });

    const messageArray = [];
    const nameRegex = /^[a-zA-Z .]+$/;
    if (!nameRegex.test(name[0])) messageArray.push("please enter valid name");
    if (!Number(price[0])) messageArray.push("enter valid price");

    if (messageArray.length > 0) throw Error(messageArray);

    const queryString = `insert into product (name, description, price, quantity, created_at, file_path) values (
    '${name[0]}', '${description[0]}', ${price[0]}, ${quantity[0]}, '${date[0]}', '${newPath}') returning id`;

    console.log(queryString);
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
