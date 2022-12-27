export default class TweetService {
  constructor(http, tokenStorage){
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getTweets (username) {
    const query = username? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  };


  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders(){
    const token = this.tokenStorage.getToken();
    return {
      Authorization : `Bearer ${token}`,
    };
  }
}
