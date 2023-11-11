module.exports={
    DB:{
        HOST: process.env.DB_HOST,
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD
    },
    REDIS:{
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT
    }
}