import { validationResult } from 'express-validator';

// router 폴더 안에서 여러번 쓰기 위해 모듈화 함
export const validate = (req, res, next) => {
    const errors = validationResult(req);
        if(errors.isEmpty()){
        return next();
        }
        return res.status(400).json({ message : errors.array()[0].msg });
    }