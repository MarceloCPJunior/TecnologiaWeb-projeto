import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.send('GET')
})

router.post('/', (req, res) => {
    res.send('POST')
})

router.delete('/', (req, res) => {
    res.send('DELETE')
})

export default router