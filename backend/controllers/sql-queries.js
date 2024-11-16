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

const insertMyUser = async ( name, email, password ) => {
    const users = await sql`
        insert into users
            (name, email, password)
        values
            (${ name }, ${ email }, ${ password})
        returning email
    `;
    return users
}

const getUserPassword = async (email) => {
    const user = await sql`
        select password from users
        where email = ${email}
    `;
    return user[0].password;
}


module.exports = {
    insertMerchant,
    insertMyUser,
    getUserPassword
};