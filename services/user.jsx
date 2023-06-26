import jwt from 'jsonwebtoken'
import databaseConnection from '../pages/api/utils/database'
import User from '../pages/api/models/user'

const SECRET = 'as35dh46sd8j46wsr8t4w684bes'

function createToken(user) {
    return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        throw new Error('Token inválido')
    }
}

export function verifyToken(token) {
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

export const favorit = async (body) => {
    await databaseConnection();
    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    if (user == null) {
        throw new Error('Usuário não encontrado');
    }

    const index = user.favoritos.indexOf(userData.movieId);
    if (index !== -1) {
        user.favoritos.splice(index, 1);
    } else {
        user.favoritos.push(userData.movieId);
    }

    await user.save();
    return user.favoritos
};

export const getFavoritos = async (body) => {
    await databaseConnection();
    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    if (user == null) {
        throw new Error('Usuário não encontrado');
    }

    return user.favoritos
};