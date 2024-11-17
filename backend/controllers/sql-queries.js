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

const insertMyUser = async ( name, email, password ) => {
    const users = await sql`
        INSERT INTO users
            (name, email, password)
        VALUES
            (${ name }, ${ email }, ${ password})
        RETURNING email`;
    return users;
}

const getUserPassword = async (email) => {
    const user = await sql`
        SELECT password FROM users
        WHERE email = ${email}`;
    return user[0].password;
}


const addBooking = async(parkingSpaceId, timeIn, timeOut, userId, userVehicleId) => {
    const booking = await sql`
        INSERT INTO bookings
            (parking_space_id, start_time, end_time, user_id, user_vehicle_id)
        VALUES
            (${ parkingSpaceId }, ${ timeIn }, ${ timeOut }, ${ userId }, ${ userVehicleId })
        RETURNING id`;
    return booking;
}


module.exports = {
    insertMerchant,
    insertMyUser,
    getUserPassword,
    addBooking
}