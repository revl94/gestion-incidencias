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

    glpi: {
        host: process.env.GLPI_HOST,
        port: process.env.DB_PORT,
        user: process.env.GLPI_USER,
        password : process.env.GLPI_PASS,
        database : process.env.GLPI_DB,
        timezone: process.env.DB_TIMEZONE,
        connectionLimit: process.env.DB_CONNECTIONLIMIT,
        acquireTimeout: process.env.DB_ACQUIRETIMEOUT
    }

};
