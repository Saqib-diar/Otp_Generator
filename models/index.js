const dbConfig = require('../config/db')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases:false,
        logging: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)


sequelize.authenticate()
.then(()=>{
    console.log('connected succesfully');
})
.catch(e=>{console.log('ERROR' + e);})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//user table
db.users = require('./user.js')(sequelize, DataTypes)

//sync
db.sequelize.sync({force:false})
.then(()=> {
    console.log('yes re-sync');
})


module.exports = db