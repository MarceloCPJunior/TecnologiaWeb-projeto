import jwt from 'jsonwebtoken'
import databaseConnection from '../pages/api/utils/database'
import User from '../pages/api/models/user'

const SECRET = 'as35dh46sd8j46wsr8t4w684bes'

function createToken(user) {
    return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        console.log("verificou o token")
        console.log(SECRET)
        return jwt.verify(token, SECRET)
    } catch (err) {
        console.log("deu erro")
        throw new Error('Token inválido')
    }
}

export function verifyToken(token) {
    console.log("verificando token")
    console.log(token)
    return readToken(token)
}

export const register = async (body) => {
    await databaseConnection()
    const userData = JSON.parse(body);

    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new Error('Usuário já cadastrado')
    }
    const newUser = new User(userData)
    await newUser.save()

    const token = createToken(body)
    return token
}

export const login = async (body) => {
    await databaseConnection()
    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    if (user == null) {
        throw new Error('Usuário não encontrado')
    }
    
    if (user.password !== userData.password) {
        throw new Error('Senha incorreta')
    }

    const token = createToken(body)
    return token
}