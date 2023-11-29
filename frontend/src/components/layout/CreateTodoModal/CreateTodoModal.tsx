import Modal, { ModalProps } from "@/components/ui/Modal/Modal";
import CreateTodoForm, { CreateTodoFormProps } from "./CreateTodoForm";

interface CreateTodoModalProps extends CreateTodoFormProps {
    isOpen: boolean;
    onModalClose: () => void;
}

export default function CreateTodoModal({
    isOpen,
    onModalClose,
    handleSubmit,
}: CreateTodoModalProps) {
    return (
        <Modal isOpen={isOpen} onModalClose={onModalClose} title="Add new todo">
            <CreateTodoForm handleSubmit={handleSubmit} />
        </Modal>
    );
}

