//require our db
const db = require('../model')
const moment = require('moment');
//create main model
const User = db.users
var result = moment().unix();


const createUser = async (req, res)=> {
    try {
        var user = await User.create({name: "saqib diar", phone_number:"03249088331"})
        res.status(200).send(user)
        console.log("user created");
    } catch (error) {
        console.log("SERVER ERROR", error);
    }
}



const generateOTP = async (req, res)=> {
    const {phone_number} = req.body

    try {
        const user = await User.findOne({where:{phone_number: phone_number}})
        if(user){
      
            let otpcode = Math.floor(1000 + Math.random() * 9000);
            let otpdata = await User.update({
                otp: otpcode,
                otp_expiration_date: moment() +  5 * 60000,
                
            }, {where: {phone_number: phone_number}})

            res.status(200).json(`USER ID: ${user.id}`)
        } else {
            res.status(400).send("wrong phone number")
        }

        } catch (error) {
        console.log("SERVER ERROR", error);
        }
    }



const verifyOTP = async (req, res)=> {
    console.log(req.query.otp);
    const otp = req.query.otp

    try {
        const verify = await User.findOne({where: {otp: otp}})
   
        var currentDate = moment().toDate();
        console.log("current data",currentDate);
        if(verify){
             if(!(verify.otp_expiration_date > currentDate)){
                return res.status(400).send("OTP is expired") 
             }
             res.status(200).send("Verification successfull")
         } else {
            res.status(400).send("otp does not matched") 
         }
    
     } catch (error) {
        console.log("server error", error);
    }
}



module.exports = {
    createUser,
    generateOTP,
    verifyOTP

}























// const verifyOTP = async (req, res)=> {
//     console.log(req.query.otp);
//     const otp = req.query.otp

//     // console.log(new Date())
//     var currentDate = new Date();

//     const verify = await User.findOne({where: {otp: otp}})
    
//     if(!verify.otp_expiration_date > currentDate){
//         return res.status(400).send("OTP is expired")
//     }

//     if(verify){
//         res.status(200).send("Verification successfull")
//     } else {
//         res.send("otp does not matched")
//     }
// }
