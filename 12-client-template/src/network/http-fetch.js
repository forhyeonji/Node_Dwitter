export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        'dwitter-csrf-token': this.getCsrfToken(),
      },
      credentials: 'include',
    });

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something went wrong! 😝';
      const error = new Error(message);
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
    }
    return data;
  }
}
