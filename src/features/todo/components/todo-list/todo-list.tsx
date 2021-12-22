import Card from '@/components/common/layout/card/card';
import { useEffect, useState } from 'react';
import { TodoItem } from '../../interfaces/todo-item';
import todoService from '../../services/todo.service';
import TodoItemView from '../todo-item/todo-item';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await todoService.getTodos();
        setTodos(response);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  if (!todos.length) {
    return <div>No todos found</div>;
  }

  return (
    <Card>
      <div className="p-4">
        <h2>Todos</h2>
        {todos.length ? (
          <div>
            {todos.map((todo) => (
              <TodoItemView key={todo.id} todo={todo} />
            ))}
          </div>
        ) : (
          <div>Nothing to do!</div>
        )}
      </div>
    </Card>
  );
};

export default TodoList;
