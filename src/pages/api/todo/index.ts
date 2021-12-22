import todoService from '@/features/todo/repository/todo.repository';
import { OkResponse } from '@/responses/ok-response';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const response = await todoService.getTodos();
    return new OkResponse(response).toResponse(res);
  }
};

export default withApiAuthRequired(Handler);
