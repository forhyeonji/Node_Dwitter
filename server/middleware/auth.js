import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message : 'Authorization' };

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
    const AUTH_ERROR = { message : 'Authorization' };
        return res.status(401).json(AUTH_ERROR);
    };

    const token = authHeader.split(' ')[1];

// TODO: Make it secure!

    jwt.verify(
        token,
        'e4yzkg#smrEJ9YJc50WM3%9O0o$lUIsr',
        async (error, decoded) => {
            if (error){
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await userRepository.findById(decoded.id);
            if (!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id; // req.customData
            req.token = token;
            next();
        }
);



};