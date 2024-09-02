const express=require('express')
const { login, register } = require('../controllers/auth')
const router= express.Router()

router.route('/login').post(login)
router.post('/register',register)

module.exports=router
