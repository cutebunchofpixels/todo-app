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
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';
import { NoteFiltersDto } from './dto/notes-filters.dto';
import { PaginationResponse } from 'src/common/pagination-response';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';

@UseGuards(AuthGuard('jwt-access'))
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllFiltered(
    @Query() filters: NoteFiltersDto,
    @Req() request: Request,
  ): Promise<PaginationResponse<Note>> {
    const payload = request.user as JwtPayload;
    return this.notesService.getAllFiltered(filters, payload.sub);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateNoteDto, @Req() request: Request): Promise<Note> {
    const payload = request.user as JwtPayload;
    return this.notesService.create(dto, payload.sub);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.remove(id);
  }
}
