import JWT from "jsonwebtoken";
import { keys } from "../config.js";

export const authMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(403).send("Не авторизирован")
        }
        const decodedData = JWT.verify(token, keys.jwt )
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).send("Не авторизирован")
    }
}