//MAIN IMPORTS
const express = require('express'),
    { createErr } = require('../../utilities'),
    {check, validationResult} = require('express-validator')

//METHODS IMPORTS
const { postExam, getExams, getExamByID, deleteExam } = require('./examMethods')

//MAIN
const examRoute = express.Router()

examRoute.get('/', getExams)
examRoute.get('/:examId', getExamByID)
examRoute.delete('/:examId', deleteExam)
examRoute.post('/',[
    check('candidateName').exists().withMessage('Please post BASIC INFOS'),
    check('name').exists().withMessage('Please post BASIC INFOS'),
], async (req, res, next) => {
    const checkErrors = validationResult(req)
    if (!checkErrors.isEmpty()) {
        const error = createErr(checkErrors, 400)
        next(error)
    } else {
        postExam(req, res, next)
    } 
})




//EXPORT
module.exports = {
    examRoute
}