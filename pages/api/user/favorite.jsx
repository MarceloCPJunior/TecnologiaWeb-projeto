import { favorit } from "../../../services/user"

export default async function handler(req, res) {
    try{
        const fav = await favorit(req.body)
        res.status(200).json(fav)
    } catch (err) {
        res.status(400).json(err.message)
    }
}