import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken'
import { getUserByEmail } from './db/user.js';

const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

export const authMiddleware = expressjwt({
    algorithms: ['HS256'],
    credentialsRequired: false,
    secret,
});

export async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
        res.sendStatus(401);
    } else {
        const claims = { sub: user.id, email: user.email };
        const token = jwt.sign(claims, secret, {expiresIn: "10s"});
        res.json({ token })
    }
}

export async function loginCallback(email, password) {
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
        return { error: "Invalid Username or password" };
    } else {
        const claims = { sub: user.id, email: user.email };
        const token = jwt.sign(claims, secret, {expiresIn: "10d"});
        return { accessToken: token, userId: user.id }
    }
}

export async function checkToken(accessToken) {
    let decodedValue = null
    jwt.verify(accessToken, secret, (err, decoded) => {
        if(decoded)
            decodedValue = {id: decoded.sub, email: decoded.email};
    });
    return decodedValue;
}