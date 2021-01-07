//MAIN IMPORTS
const express = require('express')
const { postAnswer, getAnswers } = require('./answerMethods')

//METHODS IMPORTS


//MAIN
const answerRoute = express.Router()

answerRoute.get('/:examId/answer', getAnswers)
answerRoute.post('/:examId/answer', postAnswer)


//EXPORT
module.exports = {
    answerRoute
}