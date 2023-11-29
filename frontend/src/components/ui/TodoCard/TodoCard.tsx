import { Todo } from "@/types/models/Todo";
import PriorityBadge from "../PriorityBadge/PriorityBadge";
import Image from "next/image";
import Button from "../Button/Button";

interface TodoProps {
    todo: Todo;
    handleDone: (id: number) => void;
    handleEdit: (id: number) => void;
    handleRemove: (id: number) => void;
}

export default function TodoCard({
    todo,
    handleDone,
    handleEdit,
    handleRemove,
}: TodoProps) {
    return (
        <div className="flex flex-col border-2 rounded-lg p-4 gap-4">
            <div className="flex flex-wrap items-center gap-2">
                <PriorityBadge priority={todo.priority} />
                <Button
                    onClick={() => handleDone(todo.id)}
                    variant="icon"
                    size="xs"
                >
                    <Image
                        src="/icons/check.svg"
                        alt="check mark"
                        width={24}
                        height={24}
                    />
                </Button>
                <Button
                    onClick={() => handleEdit(todo.id)}
                    variant="icon"
                    size="xs"
                >
                    <Image
                        src="/icons/pencil.svg"
                        alt="pencil icon"
                        width={24}
                        height={24}
                    />
                </Button>
                <Button
                    onClick={() => handleRemove(todo.id)}
                    variant="icon"
                    size="xs"
                >
                    <Image
                        src="/icons/cross.svg"
                        alt="cross icon"
                        width={24}
                        height={24}
                    />
                </Button>
            </div>
            <p>{todo.content}</p>
        </div>
    );
}

