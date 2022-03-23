const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){

    const token = req.header('authorization-token')

    if(!token) return res.status(401).json({ msg: 'Acesso negado! Token não encontrado!' })

    try {
        
        const userVerified = jwt.verify(token, process.env.SECRET)
        req.user = userVerified
        next()

    } catch (error) {
     
        return res.status(401).json({ msg: 'Acesso negado! Token inválido' })

    }

}