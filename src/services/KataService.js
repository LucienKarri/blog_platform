class KataService {
  baseURL = 'https://blog.kata.academy/api';

  async sendRequest(url, method, body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      method: method,
      body,
      headers,
    });

    return await response.json();
  }

  async signInUser(body) {
    const url = `${this.baseURL}/users/login`;

    try {
      const response = await this.sendRequest(url, 'POST', JSON.stringify(body));

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signUpUser(body) {
    const url = `${this.baseURL}/users`;

    try {
      const response = await this.sendRequest(url, 'POST', JSON.stringify(body));

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(body, token) {
    const url = `${this.baseURL}/user`;

    try {
      const response = await this.sendRequest(url, 'PUT', JSON.stringify(body), token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getUser(token) {
    const url = `${this.baseURL}/user`;
    const body = null;

    try {
      const response = await this.sendRequest(url, 'GET', body, token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getArticles(offset, token) {
    const url = `${this.baseURL}/articles?limit=5&offset=${offset}`;
    const body = null;

    try {
      const response = await this.sendRequest(url, 'GET', body, token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentArticle(slug) {
    const url = `${this.baseURL}/articles/${slug}`;

    try {
      const response = await this.sendRequest(url, 'GET');

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postArticle(body, token) {
    const url = `${this.baseURL}/articles`;

    try {
      const response = await this.sendRequest(url, 'POST', JSON.stringify(body), token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateArticle(slug, body, token) {
    const url = `${this.baseURL}/articles/${slug}`;

    try {
      const response = await this.sendRequest(url, 'PUT', JSON.stringify(body), token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteArticle(slug, token) {
    const url = `${this.baseURL}/articles/${slug}`;
    const body = null;
    try {
      const response = await this.sendRequest(url, 'DELETE', body, token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async rateArticle(slug, token) {
    const url = `${this.baseURL}/articles/${slug}/favorite`;
    const body = null;
    try {
      const response = await this.sendRequest(url, 'POST', body, token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async unRateArticle(slug, token) {
    const url = `${this.baseURL}/articles/${slug}/favorite`;
    const body = null;
    try {
      const response = await this.sendRequest(url, 'DELETE', body, token);

      if (response.errors) {
        throw new Error(JSON.stringify(response.errors));
      }

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default KataService;
