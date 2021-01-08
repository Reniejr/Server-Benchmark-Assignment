const express = require('express')


const { getById, postUser } = require('./userMethods')

//MAIN
const userRoute = express.Router()

userRoute.get('/userId', getById)
userRoute.post('/', postUser)


module.exports = {
    userRoute
}