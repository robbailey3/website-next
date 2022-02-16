import * as vision from '@google-cloud/vision';

class VisionDetectionApiService {
  private client!: vision.ImageAnnotatorClient;

  public async init() {
    this.client = new vision.ImageAnnotatorClient({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
    });
    await this.client.initialize();
  }

  public async annotate(buffer: Buffer) {
    const [result] = await this.client.annotateImage({
      image: {
        content: buffer.toString('base64'),
      },
      features: [
        {
          maxResults: 50,
          type: 'LANDMARK_DETECTION',
        },
        {
          maxResults: 50,
          type: 'FACE_DETECTION',
        },
        {
          maxResults: 50,
          type: 'OBJECT_LOCALIZATION',
        },
        {
          maxResults: 50,
          type: 'LOGO_DETECTION',
        },
        {
          maxResults: 50,
          type: 'LABEL_DETECTION',
        },
        {
          maxResults: 50,
          model: 'builtin/latest',
          type: 'DOCUMENT_TEXT_DETECTION',
        },
        {
          maxResults: 50,
          type: 'SAFE_SEARCH_DETECTION',
        },
        {
          maxResults: 50,
          type: 'IMAGE_PROPERTIES',
        },
        {
          maxResults: 50,
          type: 'CROP_HINTS',
        },
      ],
    });

    return result;
  }
}

export default new VisionDetectionApiService();
