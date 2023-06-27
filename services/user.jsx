import jwt from 'jsonwebtoken'
import databaseConnection from '../pages/api/utils/database'
import User from '../pages/api/models/user'
import { useState } from 'react'

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

export const userInfo = async (body) => {
    const formData = ({
        name: '',
        email: '',
        perfilImageLink: '',
        favoritos: [],
    })

    await databaseConnection();

    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    if(user == null){
        throw new Error('Usuário não encontrado');
    }

    formData.name = user.name;
    formData.email = user.email;
    formData.perfilImageLink = user.perfilImageLink;
    formData.favoritos = user.favoritos;

    return formData;
}

export const alterEmail = async (body) => {
    await databaseConnection();

    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    const existingUser = await User.findOne({ email: userData.newField });

    if(user == null){
        throw new Error('Usuário não encontrado');
    }

    if (user.password !== userData.password) {
        throw new Error('Senha incorreta')
    }

    if(existingUser) {
        throw new Error('Esse e-mail já está em uso')
    }

    user.email = userData.newField;

    await user.save();

    return 'E-mail alterado com sucesso'
}

export const alterPassword = async (body) => {
    await databaseConnection();

    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    if(user == null){
        throw new Error('Usuário não encontrado');
    }

    if (user.password !== userData.password) {
        throw new Error('Senha incorreta')
    }

    if (user.password === userData.newField) {
        throw new Error('A senha não pode ser a mesma')
    }

    user.password = userData.newField;

    await user.save();
    
    return 'Senha alterada com sucesso'
}

export const alterPerfil = async (body) => {
    await databaseConnection();

    const userData = JSON.parse(body);

    const user = await User.findOne({ email: userData.email });

    if(user == null){
        throw new Error('Usuário não encontrado');
    }

    user.perfilImageLink = userData.newImg;

    await user.save();

    return "Perfil alterado com sucesso";
}