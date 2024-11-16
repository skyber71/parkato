const sql = require("../db/db");


const insertMerchant = async ( name, email, password ) => {
    const users = await sql`
      insert into merchants
        (name, email, password)
      values
        (${ name }, ${ email }, ${ password})
      returning email
    `;
    return users
}


module.exports = insertMerchant;