const path = require('path'),
    {readJson, writeJson} = require('fs-extra'),
    {v4} = require('uuid')

//CREATE ID
const createId = v4

//FILE PATH
const filePath = fileSrc => path.join(__dirname, fileSrc)

//READ JSON FILE
const readDB = async filePath => {
    try {
        const file = await readJson(filePath)
        return file
    } catch (error) {
        console.log(error)        
    }
}

//WRITE ON JSON FILE
const writeDB = async (filePath, file) => {
    try {
        await writeJson(filePath, file)
    } catch (error) {
        console.log(error)
    }
}

//CREATE ERROR
const createErr = (errorContent, errorCode) => {
    const error = new Error()
    error.message = errorContent
    error.httpStatusCode = errorCode
    return error
}

//CREATE MESSAGE
const createMsg = (id, type) => {
    let message;
    switch (type) {
        case 'delete':
            message = `Object with id : ${id} has been deleted.`
            break;
        case 'edit':
            message = `Object with id : ${id} has been edited.`
            break;
        default:
            break;
    }
}

//NEW OBJECT
const createObj = (body) => {
    let newObj = body
    newObj = {
        id: createId(),
        ...newObj,
        createdAt: new Date()
    }
    return newObj
}

//EDIT OBJECT
const editObj = (body, oldObj, idProp) => {
    let newObj = body
    newObj = {
        id : oldObj[idProp],
        ...newObj,
        createdAt : oldObj.createdAt,
        updatedAt : new Date()
    }
    return newObj
}

//EDIT FILE WITHOUT CHANGE ORDER
const editFile = (array, index, newObj) => {
    let newFile;
    index === 0
    ? newFile = [newObj, ...array.slice(index +1)]
    : newFile = [...array.slice(0, index), newObj, ...array.slice(index +1)]
    return newFile
}

//ARRAY METHODS
const arrayMethods = (array, filter, value, typeInfo) => {
    let result;
    switch (typeInfo) {
        case 'obj':
            result = array.find( obj => obj[filter] === value)
            break;
        case 'index':
            result = array.findIndex( obj => obj[filter] === value)
            break;
        case 'without':
            result = array.filter( obj => obj[filter] !== value)
            break;    
        case 'same':
            result = array.filter( obj => obj[filter] === value)
            break;    
        default:
            break;
    }
    return result
}

//EDIT OBJECT WITH IMAGE
const objImage = (obj, property, imgPath) => {
    let newObj ={
        ...obj,
        [property] : imgPath,
        updatedAt : new Date()
    }
    return newObj
}

//ARRAY OF IMAGES
const imagesArray = (array) => {
    let imagesURL = []
    array.map((file, index) => {
        file.originalname = `image${index}`
        let newObj = {
            name : file.originalname,
            url : file.path
        }
        imagesURL.push(newObj)
    })
    return imagesURL
}

//UTILITIES FOR EXAM ROUTE
const createQuestArray = (questionsSrc, quantity) => {
    let questionsList = []
    for (let i = 0; i < quantity; i++) {
        let randomIndex = Math.floor(Math.random()*questionsSrc.length),
            question = questionsSrc[randomIndex],
            findQuest = questionsList.map( quest => quest.text === question.text)
        if (findQuest) {
            let randomIndex = Math.floor(Math.random()*questionsSrc.length),
                question = questionsSrc[randomIndex]
            questionsList.push(question)
        } else {
            questionsList.push(question)
        }
    }
    return questionsList
}

//UTILITIES EXPORTS
module.exports = {
    createId,
    filePath,
    readDB,
    writeDB,
    createErr,
    createMsg,
    createObj,
    editObj,
    editFile,
    arrayMethods,
    objImage, 
    imagesArray,
    createQuestArray
}