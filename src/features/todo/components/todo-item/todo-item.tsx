import { TodoItem } from '../../interfaces/todo-item';

type TodoItemProps = {
  todo: TodoItem;
};

const TodoItemView = (props: TodoItemProps) => {
  const { todo } = props;

  return (
    <div>
      <input
        type="checkbox"
        name={todo.title}
        id={todo.id}
        checked={todo.completed}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
    </div>
  );
};

export default TodoItemView;
