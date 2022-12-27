import * as userRepository from '../data/auth.js';

let tweets = [
    {
        id: '1',
        text: '너무춥다 너무너무 추워 ㅠ',
        createdAt: new Date().toString(),
        userId:'1',
    },
    {
        id: '2',
        text: '손이 너무 차가워 ㅠㅠ',
        createdAt: new Date().toString(),
        userId:'1',
    }
];

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await userRepository.findById(tweet.userId);
            return { ...tweet, username, name, url };
        })
    );
}

export async function getAllByUsername (username){
    return getAll().then((tweets) => 
        tweets.filter((tweet) => tweet.username === username)
    );
}

export async function getById (id){
    const found = tweets.find((tweet) => tweet.id === id); // 게시글 id 가 일치하는것을 found 에 담는다.
    if(!found){
        return null;
    }
    const { username, name, url } = await userRepository.findById(found.userId); // found 의 userId 로 데이터를 가져온다.
    return {...found, username, name, url};
}

export async function create (text, userId){
    const tweet = {
        id : Date.now().toString(),
        text,
        createdAt : new Date(),
        userId,
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
}

export async function update (id, text){
    const tweet = tweets.find((f) => f.id === id);
    if(tweet){
        tweet.text = text;
    }
    return getById(tweet.id);
}


export async function remove (id){
    tweets = tweets.filter(t => t.id !== id);
}