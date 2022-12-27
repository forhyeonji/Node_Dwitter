import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res){
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());

    res.status(200).json(data);
};

export async function getTweet(req, res, next){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).send({message : `Tweet id(${id}) not found`});
    }
};

export async function createTweet(req, res, next){
    const { text } = req.body
    const tweet = await tweetRepository.create(text, req.userId);
    res.status(201).json(tweet);
};

export async function updateTweet(req, res, next) {
    // req에서 id를 찾는다.
    // req의 body에서 온 정보중에서 text를 찾는다.
    // id 일치하는 것의 text를 바꿔준다.
    const id = req.params.id;
    const text = req.body.text;

    // 수정하는 대상이 되는 트윗
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
    };

export async function removeTweet(req, res, next){
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
};