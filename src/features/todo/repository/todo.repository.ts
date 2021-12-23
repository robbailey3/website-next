import databaseService from '@/services/database/database.service';
import { ObjectId } from 'bson';
import { TodoItem } from '../interfaces/todo-item';

class TodoRepository {
  public async getTodos(): Promise<TodoItem[]> {
    await databaseService.connect();

    const collection = databaseService.getCollection('todos');
    return await collection.find<TodoItem>({}).toArray();
  }

  public async updateTodo(todoItem: TodoItem): Promise<void> {
    await databaseService.connect();

    const collection = databaseService.getCollection('todos');
    const todoId = ObjectId.createFromHexString(todoItem._id);
    const todo = await collection.findOne<TodoItem>({
      _id: ObjectId.createFromHexString(todoItem._id),
    });
    if (todo) {
      todo.completed = !todo.completed;
      await collection.updateOne({ _id: todoId }, { $set: { ...todo } });
    }
  }

  public async addTodo(todo: TodoItem): Promise<void> {
    await databaseService.connect();

    const collection = databaseService.getCollection('todos');
    await collection.insertOne(todo);
  }

  public async deleteTodo(todoId: string): Promise<void> {
    await databaseService.connect();

    const collection = databaseService.getCollection('todos');
    await collection.deleteOne({ _id: ObjectId.createFromHexString(todoId) });
  }
}

export default new TodoRepository();
