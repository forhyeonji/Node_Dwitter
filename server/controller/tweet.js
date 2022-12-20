import * as tweetRepository from '../data/tweet.js';

export function getTweets(req, res){
    const username = req.query.username;
    const data = username
        ? tweetRepository.getByUsername(username)
        : tweetRepository.getAll();

    res.status(200).json(data);
};

export function getTweet(req, res, next){
    const id = req.params.id;
    const tweet = tweetRepository.getById(id);
    
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).send({message : `Tweet id(${id}) not found`});
    }
};

export function createTweet(req, res, next){
    const { text, name, username } = req.body
    const tweet = tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
};

export function updateTweet(req, res, next){
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

};

export function removeTweet(req, res, next){
    const id = req.params.id;
    tweetRepository.remove(id);
    res.sendStatus(204);
};