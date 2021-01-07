//UTILITIES IMPORTS
const { body } = require('express-validator')
const { filePath, readDB, arrayMethods, editObj, editFile, writeDB } = require('../../utilities')

//MAIN
const examPath = filePath('./Routes/exam/exam.json')

//METHODS

//GET + FILTER
const getAnswers = ('/:examId/answer/', async (req, res, next) => {
    const examFile = await readDB(examPath),
        questIndex = req.query.questIndex
    const examId = req.params.examId
    const examSelected = arrayMethods(examFile, 'id', examId, 'obj'),
        questSelected = examSelected.questions[questIndex]
    let answers;
    try {
        answers = questSelected.answers
        res.send(answers)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//GET BY ID

//POST
const postAnswer = ('/:examId/answer/', async (req, res, next) => {
    const examFile = await readDB(examPath),
        examId = req.params.examId
    const questIndex = req.query.questIndex
    let selected = arrayMethods(examFile, 'id', examId, 'obj'),
        selectedIndex = arrayMethods(examFile, 'id', examId, 'index'),
        questAnswers = selected.questions[questIndex],
        correctAnswer = arrayMethods(questAnswers.answers, 'isCorrect', true, 'index'),
        totalQuest = selected.questions.length,
        body = req.body
    try {
        let answerList = [],
            answer ={
                question : parseInt(questIndex),
                ...body
            }
        selected.answerList ? answerList = selected.answerList : answerList = []
        answerList.push(answer)

        let actualScore = 0;
        selected.actualScore ? actualScore = selected.actualScore : actualScore = 0
        body.answer === correctAnswer ? actualScore = actualScore + 1 : actualScore = actualScore
        
        let newObj;
        if (answerList.length === totalQuest) {
            newObj = {
                ...selected,
                isCompleted : true,
                answerList : answerList,
                totalScore : actualScore
            }
        } else {
            newObj = {
                ...selected,
                answerList : answerList,
                actualScore : actualScore
            }
        }
        const updatedFile = editFile(examFile, selectedIndex, newObj)
        await writeDB(examPath, updatedFile)
        res.send(`${actualScore}`)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//DELETE

//PUT

//EXPORT
module.exports = {
    getAnswers,
    postAnswer
}