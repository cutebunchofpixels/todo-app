import { PaginationResponse } from "@/types/PaginationResponse";
import { apiSlice } from "../../apiSlice";
import { Todo } from "@/types/models/Todo";
import { TodoFiltersDto } from "@/types/todos/dto/TodoFiltersDto";
import { booleanToQueryParam } from "@/common/booleanToQueryParam";
import { UpdateTodoDto } from "@/types/todos/dto/UpdateTodoDto";
import { CreateTodoDto } from "@/types/todos/dto/CreateTodoDto";

const todosApi = apiSlice.injectEndpoints({
    endpoints(builder) {
        return {
            fetchTodos: builder.query<PaginationResponse<Todo>, TodoFiltersDto>(
                {
                    query(filters) {
                        const params = new URLSearchParams();

                        for (const [key, value] of Object.entries(filters)) {
                            if (!value) {
                                continue;
                            }

                            if (typeof value === "boolean") {
                                params.set(key, booleanToQueryParam(value));
                            } else {
                                params.set(key, String(value));
                            }
                        }

                        return "/todos?" + params;
                    },
                    providesTags: ["Todos"],
                }
            ),

            createTodo: builder.mutation<Todo, CreateTodoDto>({
                query(dto) {
                    return {
                        url: `/todos`,
                        method: "POST",
                        body: dto,
                    };
                },
                invalidatesTags: ["Todos"],
            }),

            updateTodo: builder.mutation<
                Todo,
                UpdateTodoDto & Pick<Todo, "id">
            >({
                query({ id, ...body }) {
                    return {
                        url: `todos/${id}`,
                        method: "PATCH",
                        body,
                    };
                },
                invalidatesTags: ["Todos"],
            }),

            deleteTodo: builder.mutation<void, Pick<Todo, "id">>({
                query({ id }) {
                    return {
                        url: `todos/${id}`,
                        method: "DELETE",
                    };
                },
            }),
        };
    },
});

export const {
    useFetchTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApi;

