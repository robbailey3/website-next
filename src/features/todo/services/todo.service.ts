import axios from 'axios';
import { ApiResponse } from 'src/interfaces/api-response';
import { TodoItem } from '../interfaces/todo-item';

class TodoService {
  public fetcher = (url: string): Promise<TodoItem[]> =>
    axios
      .get<ApiResponse<TodoItem[]>>(url)
      .then((response) => response.data.result);

  public async getTodos(): Promise<TodoItem[]> {
    const response = await axios.get<ApiResponse<TodoItem[]>>(`/api/todo`);

    return response.data.result;
  }

  public async update(todo: TodoItem): Promise<TodoItem> {
    const response = await axios.patch<ApiResponse<TodoItem>>(
      `/api/todo/${todo._id}`,
      todo
    );

    return response.data.result;
  }
}

export default new TodoService();
