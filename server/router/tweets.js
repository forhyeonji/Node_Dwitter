import express from 'express';
import 'express-async-errors';
import * as tweetRepository from '../data/tweet.js'

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username

router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweetRepository.getByUsername(username)
        : tweetRepository.getAll();

    res.status(200).json(data);
})

// GET /tweets/:id

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetRepository.getById(id);
    
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).send({message : `Tweet id(${id}) not found`});
    }
})

// POST /tweets

router.post('/', (req, res, next) => {
    const { text, name, username } = req.body
    const tweet = tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
})


// PUT /tweets/:id

router.put('/:id', (req, res, next) => {
    // req에서 id를 찾는다.
    // req의 body에서 온 정보중에서 text를 찾는다.
    // id 일치하는 것의 text를 바꿔준다.

    const id = req.params.id;
    const text = req.body.text;

    // 수정하는 대상이 되는 트윗
    const tweet = tweetRepository.update(id, text);
    if (tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).send({message : `Tweet id(${id}) not found`});
    }

});


// DELETE /tweets/:id

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweetRepository.remove(id);
    res.sendStatus(204);
});

export default router;