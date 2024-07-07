const db = require("../db");

const getProduct = async () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM product", (error, results) => {
            if (error) {
                console.error("Error fetching products:", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = { getProduct };
