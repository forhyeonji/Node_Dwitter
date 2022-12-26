import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

// TODO : Make it secure!
const jwtSecretKey = 'e4yzkg#smrEJ9YJc50WM3%9O0o$lUIsr'; // 길이 : 32
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res){
    const { username, password, name, email, url } = req.body;
    
    // repository 에 동일한 username 이 있는지 찾는다.
    const found = await userRepository.findByUsername(username);
    if (found){
        // 동일한 이름이 있다면 에러!
        return res.status(409).json({ message: `${username} already exists` });
    }
    
        // 없다면 비밀번호를 hash 한다.
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    console.log('🟥',hashed);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
};


export async function login(req, res){
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);
    console.log('유저에는??',user);
    if (!user){
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword){
        return res.status(401).json({ message: 'Invalid user or password' });
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });


};

function createJwtToken(id){
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};

export async function me(req, res, next){
    const user = await userRepository.findById(req.userId);
    if (!user){
        return res.status(404).json({ message : 'User not found' });
    }
    console.log('요청에 토큰이 있을까?',req.token);
    res.status(200).json({ token : req.token, username: user.username, userId: req.userId });
};