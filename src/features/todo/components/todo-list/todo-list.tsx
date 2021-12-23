import Card from '@/components/common/layout/card/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ApiResponse } from 'src/interfaces/api-response';
import useSWR from 'swr';
import { TodoItem } from '../../interfaces/todo-item';
import todoService from '../../services/todo.service';
import TodoItemView from '../todo-item/todo-item';

const TodoList = () => {
  const fetcher = async (url: string): Promise<ApiResponse<TodoItem[]>> => {
    const response = await axios.get<ApiResponse<TodoItem[]>>(url);
    return response?.data;
  };
  const { data, error } = useSWR('/api/todo', fetcher);

  console.log({ data, error });

  if (!data || error) {
    return <div>No todos found</div>;
  }

  return (
    <Card>
      <div className="p-4">
        <h2>Todos</h2>
        {data.result.length ? (
          <div>
            {data.result.map((todo: TodoItem) => (
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
