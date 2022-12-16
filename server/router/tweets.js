import express from 'express';
import 'express-async-errors';

let tweets = [
    {
        id: '1',
        text: '너무춥다 너무너무 추워 ㅠ',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://cdn.vectorstock.com/i/1000x1000/51/95/businessman-avatar-cartoon-character-profile-vector-25645195.webp',
    },
    {
        id: '2',
        text: '손이 너무 차가워 ㅠㅠ',
        createdAt: Date.now().toString(),
        name: 'Hyeon',
        username: 'hyeon',
    },
];
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username

router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter(t => t.username === username)
        : tweets;

    res.status(200).json(data);
})

// GET /tweets/:id

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find(f => f.id === id);
    
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).send({message : `Tweet id(${id}) not found`});
    }
})

// POST /tweets

router.post('/', (req, res, next) => {
    const { text, name, username } = req.body
    const tweet = {
        id : Date.now().toString(),
        text,
        createdAt : new Date(),
        name,
        username,
    };

    tweets = [tweet, ...tweets];
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
    const tweet = tweets.find(f => f.id === id);
    if (tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).send({message : `Tweet id(${id}) not found`});
    }

});


// DELETE /tweets/:id

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter(t => t.id !== id);
    res.sendStatus(204);
});

export default router;