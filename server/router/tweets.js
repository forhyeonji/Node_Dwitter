import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js'
import { body, query } from 'express-validator';
import { validate } from '../middleware/validator.js';

// validation
// sanitization
const router = express.Router();

const validateTweet = [
    body('text')
    .trim()
    .isLength({ min : 5 })
    .withMessage('text should be at least 5 characters'),
    validate,
];

// GET /tweets
// GET /tweets?username=:username
// getTweets함수()로 바로 호출하면 값이 연결되니 getTweets 함수만 연결해야한다.
router.get(
    '/', 
    query('username')
        .trim()
        .toLowerCase(),
    validate,
    tweetController.getTweets);


// GET /tweets/:id
router.get('/:id', validate, tweetController.getTweet);


// POST /tweets
router.post('/', validateTweet, tweetController.createTweet);


// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);


// DELETE /tweets/:id
router.delete('/:id', validate, tweetController.removeTweet);

export default router;