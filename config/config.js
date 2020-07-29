module.exports = {
    database:{
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        timezone: process.env.DB_TIMEZONE,
        connectionLimit: process.env.DB_CONNECTIONLIMIT,
        acquireTimeout: process.env.DB_ACQUIRETIMEOUT
    },

};
