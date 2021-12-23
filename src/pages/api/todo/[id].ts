import todoRepository from '@/features/todo/repository/todo.repository';
import { AcceptedResponse } from '@/responses/accepted-response';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const { id } = req.query;
    const todoItem = req.body;

    await todoRepository.updateTodo({ ...todoItem, _id: id });

    return new AcceptedResponse().toResponse(res);
  }
};

export default withApiAuthRequired(Handler);
