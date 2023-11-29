import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { TodoFiltersDto } from './dto/todo-filters.dto';
import { PaginationResponse } from 'src/common/pagination-response';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@UseGuards(AuthGuard('jwt-access'))
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllFiltered(
    @Query() filters: TodoFiltersDto,
    @Req() request: Request,
  ): Promise<PaginationResponse<Todo>> {
    const payload = request.user as JwtPayload;
    return this.todoService.getAllFiltered(filters, payload.sub);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateTodoDto, @Req() request: Request): Promise<Todo> {
    const payload = request.user as JwtPayload;
    return this.todoService.create(dto, payload.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.remove(id);
  }
}
