import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js'

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username

// getTweets함수()로 바로 호출하면 값이 연결되니 getTweets 함수만 연결해야한다.
router.get('/', tweetController.getTweets);


// GET /tweets/:id
router.get('/:id', tweetController.getTweet);


// POST /tweets
router.post('/', tweetController.createTweet);


// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);


// DELETE /tweets/:id
router.delete('/:id', tweetController.removeTweet);

export default router;