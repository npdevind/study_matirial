const db = require("../db");
const fs = require("fs-extra");

const getUser = async () => {
  const data = await db.query(
    `SELECT user_id, username, email, password, first_name, last_name, phone_number, address, city, state, zip_code, country, role, is_active, date_of_birth, to_char(date_of_birth, 'dd-mm-yyyy') AS date, file_path FROM users ORDER BY user_id ASC`
  );
  return data.rows;
};

const insertNewModel = async (fields, files) => {
  const { username, email, password, first_name, last_name, phone_number, address, city, state, zip_code, country, role, is_active, date_of_birth, } = fields;
  // Image Upload
  const imageName = files.image[0].originalFilename;
  const imageOldPath = files.image[0].path;
  const newPath = "public/upload/images/" + imageName;
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
  // Regular expressions for validation
  const usernameRegex = /^[a-zA-Z]{3,15}$/;
  const firstnameRegex = /^[a-zA-Z .]+$/;
  const lastnameRegex = /^[a-zA-Z .]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const addressRegex = /^[A-Za-z0-9\s,./-]{5,100}$/;
  const cityRegex = /^[A-Za-z\s'-]{2,50}$/;
  const stateRegex = /^[A-Za-z\s-]{3,30}$/;
  const zipCodeRegex = /^[1-9][0-9]{5}$/;
  const countryRegex = /^India$/;
  const roleRegex = /^(admin|user|guest)$/;
  const dateOfBirthRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  // Check for missing fields
  const requiredFields = { username, email, password, first_name, last_name, phone_number, address, city, state, zip_code, country, role, is_active, date_of_birth,};
  for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
    if (fieldValue === undefined || fieldValue === "") {
      messageArray.push(`The ${fieldName.replace("_", " ")} field is required.`);
    }
  }

  // Validate fields if they are filled
  if (messageArray.length === 0) {
    if (!usernameRegex.test(username[0]))messageArray.push("Please enter a valid username (3-15 characters, letters only)");
    if (!firstnameRegex.test(first_name[0]))messageArray.push("Please enter a valid first name");
    if (!lastnameRegex.test(last_name[0]))messageArray.push("Please enter a valid last name");
    if (!emailRegex.test(email[0]))messageArray.push("Please enter a valid email address");
    if (!passwordRegex.test(password[0]))messageArray.push("Password must be at least 8 characters long and contain at least one letter and one number");
    if (!phoneRegex.test(phone_number[0]))messageArray.push("Please enter a valid phone number");
    if (!addressRegex.test(address[0]))messageArray.push("Please enter a valid address");
    if (!cityRegex.test(city[0]))messageArray.push("Please enter a valid city name");
    if (!stateRegex.test(state[0]))messageArray.push("Please enter a valid state name");
    if (!zipCodeRegex.test(zip_code[0]))messageArray.push("Please enter a valid zip code");
    if (!countryRegex.test(country[0]))messageArray.push("Please enter a valid country name");
    if (!roleRegex.test(role[0]))messageArray.push("Please enter a valid role (admin, user, guest)");

    // Check if is_active is a boolean or can be converted to one
    if (typeof is_active !== "boolean") {
      if (is_active === "true" || is_active === "false") {
        body.is_active = is_active === "true";
      } else {
        messageArray.push("The 'is_active' field must be a boolean value (true or false)");
      }
    }

    if (!dateOfBirthRegex.test(date_of_birth)) {
      messageArray.push("Please enter a valid date of birth (YYYY-MM-DD)");
    } else {
      const age = calculateAge(date_of_birth);
      if (age < 18) {
        messageArray.push("You must be at least 18 years old");
      } else if (age > 60) {
        messageArray.push("Age must be between 18 and 60");
      }
    }
  }

  // Throw error if there are any validation issues
  if (messageArray.length > 0) {
    const errorMessages = messageArray.join(" ||| ");
    throw new Error(errorMessages);
  }

  // Creating a query with direct insertion of values (dangerous if not handled carefully)
  const queryString = `INSERT INTO users (username, email, password, first_name, last_name, phone_number, address, city, state, zip_code, country, role, is_active, date_of_birth) 
      VALUES (
        '${username[0]}',
        '${email[0]}',
        '${password[0]}',
        '${first_name[0]}',
        '${last_name[0]}',
        '${phone_number[0]}',
        '${address[0]}',
        '${city[0]}',
        '${state[0]}',
        '${zip_code[0]}',
        '${country[0]}',
        '${role[0]}',
        ${is_active[0]},
        '${date_of_birth[0]}') RETURNING user_id`;

  try {
    const data = await db.query(queryString);
    return {
      status: true,
      res: data.rows[0].user_id,
      msg: "User details successfully saved",
    };
  } catch (error) {
    console.error("Error inserting new model:", error.message);
    return {
      status: false,
      msg: "Problem saving user details",
      res: error.message,
    };
  }
};

function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

const deleteUser = async (id) => {
  const queryString = `DELETE FROM users WHERE user_id = ${id}`;
  await db.query(queryString);
  return true;
};

const getUserData = async (id) => {
  const queryString = `SELECT * FROM users WHERE user_id = ${id}`;
  const data = await db.query(queryString);
  return data.rows[0];
};

const updateUser = async (body) => {
  const { username, email, password, first_name, last_name, phone_number, address, city, state, zip_code, country, role, is_active, date_of_birth, edit_id, } = body;

  const messageArray = [];

  // Regular expressions for validation
  const usernameRegex = /^[a-zA-Z]{3,15}$/;
  const firstnameRegex = /^[a-zA-Z .]+$/;
  const lastnameRegex = /^[a-zA-Z .]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const addressRegex = /^[A-Za-z0-9\s,./-]{5,100}$/;
  const cityRegex = /^[A-Za-z\s'-]{2,50}$/;
  const stateRegex = /^[A-Za-z\s-]{3,30}$/;
  const zipCodeRegex = /^[1-9][0-9]{5}$/;
  const countryRegex = /^India$/;
  const roleRegex = /^(admin|user|guest)$/;
  const dateOfBirthRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  // Check for missing fields
  const requiredFields = {
    username,
    email,
    password,
    first_name,
    last_name,
    phone_number,
    address,
    city,
    state,
    zip_code,
    country,
    role,
    is_active,
    date_of_birth,
  };

  for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
    if (fieldValue === undefined || fieldValue === "") {
      messageArray.push(`The ${fieldName.replace("_", " ")} field is required.`);
    }
  }

  // Validate fields if they are filled
  if (messageArray.length === 0) {
    if (!usernameRegex.test(username))
      messageArray.push(
        "Please enter a valid username (3-15 characters, letters only)"
      );
    if (!firstnameRegex.test(first_name))
      messageArray.push("Please enter a valid first name");
    if (!lastnameRegex.test(last_name))
      messageArray.push("Please enter a valid last name");
    if (!emailRegex.test(email))
      messageArray.push("Please enter a valid email address");
    if (!passwordRegex.test(password))
      messageArray.push(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    if (!phoneRegex.test(phone_number))
      messageArray.push("Please enter a valid phone number");
    if (!addressRegex.test(address))
      messageArray.push("Please enter a valid address");
    if (!cityRegex.test(city))
      messageArray.push("Please enter a valid city name");
    if (!stateRegex.test(state))
      messageArray.push("Please enter a valid state name");
    if (!zipCodeRegex.test(zip_code))
      messageArray.push("Please enter a valid zip code");
    if (!countryRegex.test(country))
      messageArray.push("Please enter a valid country name");
    if (!roleRegex.test(role))
      messageArray.push("Please enter a valid role (admin, user, guest)");

    // Check if is_active is a boolean or can be converted to one
    if (typeof is_active !== "boolean") {
      if (is_active === "true" || is_active === "false") {
        body.is_active = is_active === "true";
      } else {
        messageArray.push("The 'is_active' field must be a boolean value (true or false)");
      }
    }

    if (!dateOfBirthRegex.test(date_of_birth)) {
      messageArray.push("Please enter a valid date of birth (YYYY-MM-DD)");
    } else {
      const age = calculateAge(date_of_birth);
      if (age < 18) {
        messageArray.push("You must be at least 18 years old");
      } else if (age > 60) {
        messageArray.push("Age must be between 18 and 60");
      }
    }
  }

  // Throw error if there are any validation issues
  if (messageArray.length > 0) {
    const errorMessages = messageArray.join(", ");
    throw new Error(errorMessages);
  }

  const queryString = `UPDATE users SET 
        username = '${username}',
        email = '${email}',
        password = '${password}',
        first_name = '${first_name}',
        last_name = '${last_name}',
        phone_number = '${phone_number}',
        address = '${address}',
        city = '${city}',
        state = '${state}',
        zip_code = '${zip_code}',
        country = '${country}',
        role = '${role}',
        is_active = ${is_active},
        date_of_birth = '${date_of_birth}' 
      WHERE user_id = ${edit_id} RETURNING user_id`;

  try {
    const data = await db.query(queryString);
    return {
      status: true,
      res: data.rows[0].user_id,
      msg: "User details successfully updated",
    };
  } catch (error) {
    console.error("Error updating user:", error.message);
    return {
      status: false,
      msg: "Problem updating user details",
      res: error.message,
    };
  }
};

module.exports = {
  getUser,
  insertNewModel,
  deleteUser,
  getUserData,
  updateUser,
};
