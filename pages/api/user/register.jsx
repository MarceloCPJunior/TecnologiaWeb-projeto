import { register } from '../../../services/user'

export default async function handler(req, res) {
    try {
        const token = await register(req.body)
        res.status(201).json(token)
    } catch (err) {
        res.status(400).json(err.message)
    }
}