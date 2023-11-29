import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoFiltersDto } from './dto/todo-filters.dto';
import { PaginationResponse } from 'src/common/pagination-response';
import { Like } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  getById(id: number): Promise<Todo> {
    return this.todoRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async getAllFiltered(
    filters: TodoFiltersDto,
    userId: number,
  ): Promise<PaginationResponse<Todo>> {
    const [todos] = await this.todoRepo.findAndCount({
      where: [
        {
          content: Like(`%${filters.content ?? ''}%`),
          done: filters.done,
          userId,
        },
      ],
      take: filters.take,
      skip: filters.skip,
      order: filters.orderBy
        ? { [filters.orderBy]: filters.orderDirection }
        : undefined,
    });

    const [, total] = await this.todoRepo.findAndCount();

    return {
      items: todos,
      total,
    };
  }

  async create(dto: CreateTodoDto, userId: number): Promise<Todo> {
    const todo = this.todoRepo.create({ ...dto, userId });
    return this.todoRepo.save(todo);
  }

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.getById(id);
    Object.assign(todo, dto);

    return this.todoRepo.save(todo);
  }

  async remove(id: number): Promise<Todo> {
    const todo = await this.getById(id);

    return this.todoRepo.remove(todo);
  }
}
