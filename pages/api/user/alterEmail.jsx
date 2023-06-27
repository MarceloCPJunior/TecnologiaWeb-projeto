import { alterEmail } from '../../../services/user'

export default async function handler(req, res) {
    try {
        const token = await alterEmail(req.body)
        res.status(200).json(token)
    } catch (err) {
        res.status(400).json(err.message)
    }
}