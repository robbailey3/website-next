import {
  Get,
  generateHandler,
  Post,
  Put,
  Delete,
  Patch,
  withBodyValidation,
} from '@/utils/http/decorators/httpMethod';
import { IsString } from 'class-validator';

class TestBody {
  @IsString()
  public name!: string;
}

class HttpHandlers {
  @Get()
  public get(req: any, res: any) {
    console.log({ req, res });
    return Promise.resolve({ method: 'GET' });
  }

  @Put()
  public put(req: any, res: any) {
    console.log({ req, res });
    return Promise.resolve({ method: 'PUT' });
  }

  @Patch()
  public patch() {
    console.log({ req, res });
    return Promise.resolve({ method: 'PATCH' });
  }

  @Post()
  @withBodyValidation(TestBody)
  public create() {
    return Promise.resolve({ method: 'POST' });
  }

  @Delete()
  public delete() {
    return Promise.resolve({ method: 'DELETE' });
  }
}
export default generateHandler(HttpHandlers);
