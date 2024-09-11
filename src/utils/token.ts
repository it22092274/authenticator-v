import  jwt from "jsonwebtoken";

const JWT_SECRET = "Palayan_huththto_yanna"
const JWT_EXPIRATIOM = '36h'

export const createToken = (userId: string): string => {
    const payload = { _id: userId}

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATIOM})

    return token
}

export const validateToken = (token: string): any => {
    try {
        const decode = jwt.verify(token, JWT_SECRET)
        return decode
    } catch (error) {
        return null
    }
}