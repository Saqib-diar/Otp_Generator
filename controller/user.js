//require our db
const db = require('../models')
const moment = require('moment');
//create main model
const User = db.users
var result = moment().unix();


const createUser = async (req, res)=> {
    const {name, phone_number} = req.body;

    try {
        // var user = await User.create({name: "saqib diar", phone_number:"03249088331"})
        var user = await User.create({name: name, phone_number: phone_number})
        res.status(200).send({statusText: "success", user})
    } catch (error) {
        console.log("SERVER ERROR", error);
    }
}



const generateOTP = async (req, res)=> {
    const {phone_number} = req.body; //phone_number from body

    try {
        const user = await User.findOne({where:{phone_number: phone_number}}) //if user phone_number exist in user table
       
        if(user){
            //generate otp
            let otpcode = Math.floor(1000 + Math.random() * 9000); //4digit otp
            let otpdata = await User.update({   //save the otp in user table
                otp: otpcode,
                otp_expiration_date: moment() +  5 * 60000, //5min in future
                
            }, {where: {phone_number: phone_number}})

            res.status(200).json(`USER ID: ${user.id}`)//returning userId in response
        } else {
            res.status(400).send("wrong phone number")
        }

        } catch (error) {
            res.status(500).send("SERVER ERROR", error)
        }
    }



const verifyOTP = async (req, res)=> {
    const otp = req.query.otp

    try {
        const user = await User.findOne({where: {otp: otp}})
   
        var currentDate = moment().toDate();
        if(user){
             if(!(user.otp_expiration_date > currentDate)){
                return res.status(400).send("OTP is expired") 
             }
             res.status(200).send({message:"Verification successfull", user}) //sent user object in response
         } else {
            res.status(400).send("OTP is incorrect") 
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
