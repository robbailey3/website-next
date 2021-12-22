import axios from 'axios';
import { ApiResponse } from 'src/interfaces/api-response';
import { TodoItem } from '../interfaces/todo-item';

class TodoService {
  public async getTodos(): Promise<TodoItem[]> {
    const response = await axios.get<ApiResponse<TodoItem[]>>(`/api/todo`);

    return response.data.result;
  }
}

export default new TodoService();
