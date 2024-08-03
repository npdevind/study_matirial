import con from "../db.js";

export const getBlogCategoryList = async () => {
    try {
        const data = await con.query(
            `select id, trim(category_name) as name, to_char(created_date, 'YYYY-MM-DD') as created_date, is_active from blog_category `
        );
        if (data.rows.length === 0) throw Error("No data found!");
        return data.rows;
    } catch (error) {
        throw Error(error.message);
    }
};

export const addNewBlogCategory = async ({ categoryName, isActive }) => {
    try {
        const queryString = `insert into blog_category (category_name, is_active) VALUES ('${categoryName}', ${isActive}) returning id`;
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
