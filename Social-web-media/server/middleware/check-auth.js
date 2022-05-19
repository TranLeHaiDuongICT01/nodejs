const jwt = require('jsonwebtoken')
const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500
        let decodedData
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'secret')
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = checkAuth