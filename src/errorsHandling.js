//NOT FOUND
const notFound = (err, req, res, next) => {
    if (err.httpStatusCode === 404) {
        res.status(404).send('NOT FOUND')
    }next(err)
}
//UNAUTHORIZED
const unAuthorized = (err, req, res, next) => {
    if (err.httpStatusCode === 401) {
        res.status(401).send('unAuthorized')
    }next(err)
}
//FORBIDDEN
const forbidden = (err, req, res, next) => {
    if (err.httpStatusCode === 403) {
        res.status(403).send('Forbidden')
    }next(err)
}
//BAD REQUEST
const badRequest = (err, req, res, next) => {
    if (err.httpStatusCode === 400) {
        res.status(400).send(err.message)
    }next(err)
}
//GENERIC
const genericError = (err, req, res, next) => {
    if (!res.headersSent) {
        res.status(500).send('Generic Server Error')
    }
}

module.exports = {
    notFound,
    unAuthorized,
    forbidden,
    badRequest,
    genericError
}