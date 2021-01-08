//IMPORT
const { filePath, readDB, arrayMethods, createObj, writeDB } = require('../../utilities')

//MAIN
const userPath = filePath('./Routes/user/user.json')

//METHODS

const getUser = ('/', async (req, res, next) => {
    const userFile = await readDB(userPath)
    let filtered;
    try {
        if (req.query && req.query.name) {
            filtered = arrayMethods(userFile, 'name', req.query.name, 'obj')
        } else {
            filtered = userFile
        }
        console.log(userFile)
        res.send(filtered)
    } catch (error) {
        console.log(error)
        next(error)
    }
})
const getById = ('/:userId', async (req, res, next) => {
    const userFile = await readDB(userPath),
        userId = req.params.userId
    try {
        const user = arrayMethods(userFile, 'id', userId, 'obj')
        res.send(user)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

const postUser = ('/', async (req, res, next) => {
    const userFile = await readDB(userPath),
        body = req.body
    try {
        const newObj = createObj(body)
        userFile.push(newObj)
        await writeDB(userPath, userFile)
        res.send(newObj)      
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = {
    getUser,
    getById,
    postUser
}