import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import { CreateTodoDto } from "@/types/todos/dto/CreateTodoDto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface CreateTodoFormProps {
    handleSubmit: (values: CreateTodoDto) => void;
}

const validationSchema = yup.object().shape({
    content: yup
        .string()
        .required("Content is a required field")
        .typeError("Content must be a string"),
    priority: yup
        .number()
        .required("Priority is a required field")
        .typeError("Priority must be a number"),
});

export default function CreateTodoForm({ handleSubmit }: CreateTodoFormProps) {
    const {
        register,
        handleSubmit: rhfSumbit,
        formState,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver<CreateTodoDto>(validationSchema),
    });

    return (
        <div className="flex items-center justify-center flex-col">
            <form
                className="space-y-4 flex flex-col"
                onSubmit={rhfSumbit(handleSubmit)}
            >
                <div className="grid gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="content">Content</label>
                        <Input id="content" {...register("content")} />
                        <ErrorMessage>
                            {formState.errors.content?.message}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Priority</label>
                        <Input
                            id="priority"
                            type="number"
                            {...register("priority")}
                        />
                        <ErrorMessage>
                            {formState.errors.priority?.message}
                        </ErrorMessage>
                    </div>
                </div>
                <div className="grid">
                    <Button type="submit">Sumbit</Button>
                </div>
            </form>
        </div>
    );
}

