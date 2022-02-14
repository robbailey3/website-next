import language, { LanguageServiceClient } from '@google-cloud/language';

class SentimentAnalysisService {
  private client!: LanguageServiceClient;

  public async initialise() {
    this.client = new language.LanguageServiceClient({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });
    await this.client.initialize();
  }

  public async analyseString(str: string) {
    const document: any = {
      content: str,
      type: 'PLAIN_TEXT',
    };

    const [result] = await this.client.analyzeEntitySentiment({ document });

    return result;
  }

  public async classify(str: string) {
    const document: any = {
      content: str,
      type: 'PLAIN_TEXT',
    };

    const [result] = await this.client.classifyText({ document });

    return result;
  }

  public async getSentiment(str: string) {
    const document: any = {
      content: str,
      type: 'PLAIN_TEXT',
    };

    const [result] = await this.client.analyzeSentiment({ document });

    return result;
  }
}

export default new SentimentAnalysisService();
