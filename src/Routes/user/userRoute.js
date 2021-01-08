const express = require('express'),
    {check, validationResult} = require('express-validator')


const { getById, postUser, getUser } = require('./userMethods')
const { createErr } = require('../../utilities')
//MAIN
const userRoute = express.Router()

userRoute.get('/', getUser)
userRoute.get('/:userId', getById)
userRoute.post('/',[
    check('name').exists().withMessage('Basic info'),
    check('lastName').exists().withMessage('Basic info'),
    check('role').exists().withMessage('Basic info'),
    check('password').exists().withMessage('Basic info')
],async (req, res, next) => {
    const checkErrors = validationResult(req)
    if (!checkErrors.isEmpty()) {
        const error = createErr(checkErrors, 400)
        next(error)
    } else {
        postUser(req, res, next)
    }
})


module.exports = {
    userRoute
}