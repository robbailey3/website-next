import Checkbox from '@/components/common/form/checkbox/checkbox';
import { useState } from 'react';
import { TodoItem } from '../../interfaces/todo-item';

type TodoItemProps = {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
};

const TodoItemView = (props: TodoItemProps) => {
  const { todo, onUpdate } = props;

  const [itemComplete, setItemComplete] = useState<boolean>(todo.completed);

  const handleCheckboxToggle = () => {
    setItemComplete(!itemComplete);
    todo.completed = !itemComplete;
    onUpdate(todo);
  };

  return (
    <Checkbox
      id={todo._id}
      checked={itemComplete}
      onChange={handleCheckboxToggle}
      label={todo.title}
    />
  );
};

export default TodoItemView;
