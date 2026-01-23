import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) { return res.status(401).json({ message: "Token não especificado." }) }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Token inválido." }) }

        const dados = { userId: decoded.id, nome: decoded.nome, sobrenome: decoded.sobrenome, telefone: decoded.telefone, email: decoded.email }
        req.dados = dados
        next()
    })
}

export default authMiddleware