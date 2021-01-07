//UTILITIES IMPORTS
const { filePath, readDB, createObj, arrayMethods, writeDB, createQuestArray, createMsg, editObj, editFile } = require('../../utilities')

//MAIN
const questionsPath = filePath('./Routes/questions/questions.json'),
    examPath = filePath('./Routes/exam/exam.json')

//GET + FILTER
const getExams = ('/', async (req, res, next) => {
    const examFile = await readDB(examPath)
    let filtered;
    try {
        if (req.query && req.query.examDuration) {
            filtered = arrayMethods(examFile, 'examDuration', req.query.examDuration, 'same')
        }
        else if (req.query && req.query.candidateName) {
            filtered = arrayMethods(examFile, 'candidateName', req.query.candidateName, 'obj')
        }
        else if (req.query && req.query.isCompleted) {
            filtered = arrayMethods(examFile, 'isCompleted', req.query.isCompleted, 'same')
        }
        else{
            filtered = examFile
        }
        res.send(filtered)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//GET BY ID
const getExamByID = ('/:examId', async (req, res, next) => {
    const examFile = await readDB(examPath),
        examId = req.params.examId
    try {
        let exam = arrayMethods(examFile, 'id', examId, 'obj')
        res.send(exam)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//POST
const postExam = ('/', async (req, res, next) => {
    const examFile = await readDB(examPath),
        questionsFile = await readDB(questionsPath),
        questionsNum = req.body.quantity,
        body = req.body
    try {
        let newExam = createObj(body),
            questionsList = createQuestArray(questionsFile, questionsNum),
            examDuration = 0
        questionsList.map( quest => examDuration = examDuration + quest.duration)
        newExam = {
            ...newExam,
            isCompleted : false,
            examDuration : examDuration,
            questions: questionsList
        }
        examFile.push(newExam)
        await writeDB(examPath, examFile)
        res.send(newExam)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//DELETE
const deleteExam = ('/:examId', async (req, res, next) => {
    const examFile = await readDB(examPath),
        examId = req.params.examId
    const message = createMsg(examId, 'delete')
    try {
        let updatedFile = arrayMethods(examFile, 'id', examId, 'without')
        await writeDB(examPath, updatedFile)
        res.send(message)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//PUT
const editExam = ('/:examId', async (req, res, next) => {
    const examFile = await readDB(examPath),
        examId = req.params.examId
    const message = createMsg(examId, 'edit'),
        selected = arrayMethods(examFile, 'id', examId, 'obj'),
        selectedIndex = arrayMethods(examFile, 'id', examId, 'index')
        body = req.body
    try {
        const newObj = editObj(body, selected, 'id'),
            updatedFile = editFile(examFile, selectedIndex, newObj)
        await writeDB(examPath, updatedFile)
        res.send(message)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = {
    getExams,
    getExamByID,
    postExam,
    deleteExam,
    editExam
}