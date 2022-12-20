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

export async function getAll() {
    return tweets;
}

export async function getByUsername (username){
    return tweets.filter(t => t.username === username);
}

export async function getById (id){
    return tweets.find(f => f.id === id);
}

export async function create (text, name, username){
    const tweet = {
        id : Date.now().toString(),
        text,
        createdAt : new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function update (id, text){
    const tweet = tweets.find(f => f.id === id);
    if(tweet){
        tweet.text = text;
    }
    return tweet;
}


export async function remove (id){
    tweets = tweets.filter(t => t.id !== id);
}