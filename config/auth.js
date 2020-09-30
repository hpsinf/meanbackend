const jwt = require('jsonwebtoken')
const env = require('../.env')


module.exports = (req, res, next) => {
    
    //CORS
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization']

        if (!token) {
            return res.status(403).send({errors: ["Autorização de acesso não fornecido."]})
        }

        jwt.verify(token, env.authSecret, (err, decoded) => {
            if (err) {
                res.status(403).send({
                    errors: ["Falha de autenticação."]
                })
            } else {
                //req.decoded = decoded
                next()
            }
        })
    }
}