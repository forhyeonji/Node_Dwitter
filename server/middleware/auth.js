import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = { message : 'Authorization' };

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    // 오류처리
    if(!(authHeader && authHeader.startsWith('Bearer '))){
    const AUTH_ERROR = { message : 'Authorization' };
        return res.status(401).json(AUTH_ERROR);
    };


    // 오류가 없다면 토큰을 저장
    const token = authHeader.split(' ')[1];


// TODO: Make it secure!
    jwt.verify(
        token,
        config.jwt.secretKey,
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