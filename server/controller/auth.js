import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;

  // repository 에 동일한 username 이 있는지 찾는다.
  const found = await userRepository.findByUsername(username);
  if (found) {
    // 동일한 이름이 있다면 에러!
    return res.status(409).json({ message: `${username} already exists` });
  }

  // 없다면 비밀번호를 hash 한다.
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId); // cookie header
  setToken(res, token);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
}

export async function logout(req, res, next) {
  res.cookie('token', '');
  res.status(200).json({ message: 'User has been logged out' });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000, // 토큰과 같은 시간에 만료되도록! 대신 maxAge는 ms 이므로 1000을 곱해줌
    httpOnly: true,
    sameSite: 'none', // 서버와 클라이언트가 같은 도메인이 아니어도 쿠키설정을 할 수 있게 설정!
    secure: true, // sameSite 가 none 일 때!
  };
  res.cookie('token', token, options); // HTTP-ONLY 🍪
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  console.log('요청에 토큰이 있을까?', req.token);
  res
    .status(200)
    .json({ token: req.token, username: user.username, userId: req.userId });
}
