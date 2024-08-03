export const validationForAdd = async (req, res, next) => {
    try {
        const body = req.body;
        const regex = /^[A-Za-z]+$/;
        if (body.categoryName === "" && body.isActive === "") {
            throw Error("All fields are required.");
        }
        if (!regex.test(body.categoryName)) throw Error("Invalid category name.");
        if (typeof body.isActive != "boolean") throw Error("Invalid is active type. Only boolean allowed");
        next();
    } catch (error) {
        res.status(406).send({
            error: true,
            message: error.message,
        });
    }
};

export const validationForUpdate = async (req, res, next) => {
    try {
        const body = req.body;
        const regex = /^[A-Za-z]+$/;
        if (!body.id) throw Error("updater id not found.");
        if (body.categoryName === "" && body.isActive === "") {
            throw Error("All fields are required.");
        }
        if (!regex.test(body.categoryName)) throw Error("Invalid category name.");
        if (typeof body.isActive != "boolean") throw Error("Invalid is active type. Only boolean allowed");
        next();
    } catch (error) {
        res.status(406).send({
            error: true,
            message: error.message,
        });
    }
};
