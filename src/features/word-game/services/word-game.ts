import axios from 'axios';

class WordGameService {
  public async getWord(): Promise<string> {
    const response = await axios.get('/api/projects/word-game/word');

    return response.data.result.word;
  }
}

export default new WordGameService();
