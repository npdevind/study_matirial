import con from "../db.js";
import * as helper from "../helper/index.js";
import fs from "fs-extra";
import path from "path";

export const getBlogCategoryList = async () => {
    try {
        const data = await con.query(
            `select id, trim(category_name) as name, to_char(created_date, 'YYYY-MM-DD') as created_date, is_active, file from blog_category `
        );
        if (data.rows.length === 0) throw Error("No data found!");
        return data.rows;
    } catch (error) {
        throw Error(error.message);
    }
};

export const addNewBlogCategory = async ({ categoryName, isActive, image }) => {
    try {
        const catName = categoryName ? categoryName.toLowerCase().replace(" ", "") : "";
        if (catName) {
            const { rows } = await con.query(
                `select count(1) as "totalCount" from blog_category where LOWER(REPLACE(category_name, ' ', '')) = '${catName}'`
            );

            if (parseInt(rows[0].totalCount) >= 1) throw Error("This category name is already present. Enter a new category name.");
        }

        const uploadDir = "./public/uploads/";

        const base64Data = image.replace(/^data:.+;base64,/, "");

        const fileName = Date.now() + "." + (await helper.getBase64FileType(image));

        const filePath = path.join(uploadDir, fileName); // "public/uploads/56456456.png"

        fs.writeFile(filePath, base64Data, "base64").then((err) => {
            if (err) throw Error("Problem in file upload.");
        });

        const fileNameForDb = "uploads/" + fileName;

        const queryString = `insert into blog_category (category_name, is_active, file) VALUES ('${categoryName}', ${isActive},'${fileNameForDb}') returning id`;
        const data = await con.query(queryString);
        if (!data) throw error("Something wrong!");
        return {
            id: data.rows[0].id,
            msg: "Category inserted successfully.",
        };
    } catch (error) {
        throw Error(error.message);
    }
};

export const updateBlogCategory = async ({ id, categoryName, isActive }) => {
    try {
        const queryString = `update blog_category set category_name= '${categoryName}', is_active = ${isActive} where id= ${id} returning id`;
        const data = await con.query(queryString);
        if (!data) throw error("Something wrong!");
        return {
            id: data.rows[0].id,
            msg: "Category updated successfully.",
        };
    } catch (error) {
        throw Error(error.message);
    }
};

export const deleteBlogCategory = async ({ id }) => {
    try {
        await con.query(`BEGIN`);
        const { rowCount } = await con.query(`DELETE FROM blog_category where id = ${id}`);
        if (rowCount === 0) throw Error("Id not found.");
        await con.query(`COMMIT`);
        return {
            status: true,
            msg: "Category deleted successfully.",
        };
    } catch (error) {
        await con.query(`ROLLBACK`);
        throw Error(error.message);
    }
};
