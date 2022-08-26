
module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('users', {
        name: DataTypes.STRING,
        otp: DataTypes.STRING,
        otp_expiration_date: DataTypes.STRING,
        phone_number: DataTypes.STRING
    }, {
        timestamps: false
    })
    return Users
}
