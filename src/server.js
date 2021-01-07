//MAIN IMPORTS
const express = require('express'),
    listEndpoints = require('express-list-endpoints'),
    cors = require('cors')

//ROUTES IMPORTS
const { examRoute } = require('./Routes/exam/examRoute'),
    { answerRoute } = require('./Routes/answers/answerRoute')

//ERRORS ROUTES IMPORTS
const { notFound, unAuthorized, forbidden, badRequest, genericError } = require('./errorsHandling')

//MAIN
const server = express(),
    PORT = process.env.PORT,
    accessList = process.env.NODE_ENV === 'production'
                ? [
                    process.env.FE_URL_DEV,
                    process.env.FE_URL_PROD
                ]
                : [
                    process.env.FE_URL_DEV
                ],
    corsOptions = {
        origin : function(origin, callback) {
            accessList.indexOf( origin ) !== -1
            ? callback(null, true)
            : callback(new Error('NOT ALLOWED - CORS ISSUES'))
        }
    }
    
//MIDDLEWEARS
server.use(express.json())
server.use(cors(corsOptions))

//ROUTES
server.use('/exam', examRoute)
server.use('/exam', answerRoute)

//ERRORS ROUTES
server.use(notFound)
server.use(unAuthorized)
server.use(forbidden)
server.use(badRequest)
server.use(genericError)

//CONSOLE LOGS
console.log(listEndpoints(server))

//LISTEN
server.listen(PORT, () => {
    process.env.NODE_ENV === 'production'
    ? console.log(`Server running ONLINE on port : ${PORT}`)
    : console.log(`Server running OFFLINE on : ${process.env.BE_URL_DEV}${PORT}`)
})