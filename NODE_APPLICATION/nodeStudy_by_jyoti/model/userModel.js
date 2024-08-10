const { now } = require("moment");
const db = require("../db");

const getUsers = async () =>{
    
    try {
        const products = await db.query(`select * from users` );
        
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
const getUserById = async (id) =>{
    const query = `select * from users where user_id= ${id}`;
    const data = await db.query(query);
    return data.rows[0];
}
const addUpdateUser = async(body)=>{
  if(body.user_id !=''){
    const { user_id, username, email, password, first_name, last_name, phone_number, date_of_birth, address, city, state, zip_code, country, is_active, role } = body;
    const query = `UPDATE public.users set 
      username ='${username}', email ='${email}', password ='${password}', first_name= '${first_name}', last_name= '${last_name}', phone_number= '${phone_number}', date_of_birth= '${date_of_birth}', address= '${address}', city= '${city}', state= '${state}', zip_code= '${zip_code}', country= '${country}', is_active= ${is_active}, role= '${role}',updated_at= CURRENT_TIMESTAMP where user_id= ${user_id}`;
      console.log(query);
      const data = await db.query(query);
      
    if (data.command == 'UPDATE') {
      return {
        status: true,
        res: data.command,
        msg: "User Updated Successfully",
      };
      
    } else {
      return {
        status: false,
        msg: "Problem",
        res: "",
    };
    }
    
  }else{
    const { username, email, password, first_name, last_name, phone_number, date_of_birth, address, city, state, zip_code, country, is_active, role, created_at } = body;
    const query = `INSERT INTO public.users(
      username, email, password, first_name, last_name, phone_number, date_of_birth, address, city, state, zip_code, country, is_active, role)
     VALUES ('${username}', '${email}', '${password}', '${first_name}', '${last_name}', '${phone_number}', '${date_of_birth}', '${address}', '${city}', '${state}', '${zip_code}', '${country}', ${is_active}, '${role}') returning user_id`;

     const data = await db.query(query);
    if (!data) {
        return {
            status: false,
            msg: "Problem",
            res: "",
        };
    } else {
        return {
            status: true,
            res: data.rows[0].user_id,
            msg: "User successfully saved",
        };
    }
  }
 
  
}

const deleteUser = async(id) =>{
  const queryString = `delete from users where user_id = ${id}`;
  await db.query(queryString);
  return true;
}

module.exports = { getUsers, getUserById, addUpdateUser,deleteUser };