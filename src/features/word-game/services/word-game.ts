import axios from 'axios';
import { UUID } from 'bson';

class WordGameService {
  public async getWord(): Promise<string> {
    const response = await axios.get('/api/projects/word-game/word');

    return response.data.word;
  }
}

export default new WordGameService();
