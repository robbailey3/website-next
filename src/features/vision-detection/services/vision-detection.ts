import axios, { AxiosInstance } from 'axios';
import * as vision from '@google-cloud/vision';

class VisionDetectionService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: '/api/projects/vision-detection',
    });
  }

  public async getAnalysis(
    image: File
  ): Promise<vision.protos.google.cloud.vision.v1.IAnnotateImageResponse> {
    const formData = new FormData();
    formData.append('image', image);

    const response = await this.http.post('/annotate', formData);

    return response.data;
  }
}

export default new VisionDetectionService();
