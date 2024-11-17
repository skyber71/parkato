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
        SELECT * FROM users
        WHERE email = ${email}`;
    return user[0];
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


const insertVehicle = async(userId, vehicleName) => {
    const vehicle = await sql`
        INSERT INTO vehicles
            (name, user_id)
        VALUES
            (${ vehicleName }, ${ userId })
        RETURNING id`;
    return vehicle;
}


const checkVehicleForUser =  async (userVehicleId, userId) => {
    const vehicle = await sql`
        SELECT * FROM vehicles
        WHERE id = ${ userVehicleId } AND user_id = ${ userId }`;
    return vehicle[0];
}


module.exports = {
    insertMerchant,
    insertMyUser,
    getUserPassword,
    addBooking,
    insertVehicle,
    checkVehicleForUser
}