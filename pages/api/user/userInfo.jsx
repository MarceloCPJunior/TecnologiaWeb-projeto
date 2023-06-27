import { userInfo } from '../../../services/user'

export default async function handler(req, res) {
    try {
        const user = await userInfo(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json(err.message)
    }
}