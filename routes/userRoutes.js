const router = require('express').Router()
const {createUser, generateOTP, verifyOTP} = require('../controller/user')

router.post('/users', createUser)
router.post('/users/generateOTP', generateOTP)
router.get('/users/:user_id/verifyOTP', verifyOTP)


module.exports = router