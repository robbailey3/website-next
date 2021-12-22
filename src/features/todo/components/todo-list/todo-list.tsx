import Card from '@/components/common/layout/card/card';
import { useEffect, useState } from 'react';
import { TodoItem } from '../../interfaces/todo-item';
import todoService from '../../services/todo.service';

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
      <div>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </div>
    </Card>
  );
};

export default TodoList;
