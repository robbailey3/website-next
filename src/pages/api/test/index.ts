import {
  Get,
  Put,
  Patch,
  Post,
  Delete,
} from '@/features/api/decorators/HttpVerbs';
import { withBodyValidation } from '@/features/api/decorators/Validation';
import { generateHttpHandler } from '@/features/api/utils/generateHttpHandler';
import { OkResponse } from '@/responses/OkResponse';
import { IsString } from 'class-validator';

class TestBody {
  @IsString()
  public name!: string;
}

class HttpHandlers {
  @Get()
  public get(req: any, res: any) {
    return OkResponse(res, { method: 'GET' });
  }

  @Put()
  public put(req: any, res: any) {
    return Promise.resolve({ method: 'PUT' });
  }

  @Patch()
  public patch(req: any, res: any) {
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
export default generateHttpHandler(HttpHandlers);
