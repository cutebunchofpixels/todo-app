import TodoCard from "@/components/ui/TodoCard/TodoCard";
import { Todo } from "@/types/models/Todo";

interface TodoListProps {
    todos: Todo[];
    handleDone: (id: number) => void;
    handleEdit: (id: number) => void;
    handleRemove: (id: number) => void;
}

export default function TodoList({ todos, ...rest }: TodoListProps) {
    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} {...rest} />
            ))}
        </div>
    );
}

