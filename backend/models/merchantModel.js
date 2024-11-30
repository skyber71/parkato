const sql = require("../db/db");


const insertMerchant = async ( name, email, password ) => {
    const users = await sql`
        INSERT INTO merchants
            (name, email, password)
        VALUES
            (${ name }, ${ email }, ${ password})
        RETURNING email`;
    return users;
}


module.exports = {
    insertMerchant
}