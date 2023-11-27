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
} from '@nestjs/common';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';
import { NoteFiltersDto } from './dto/notes-filters.dto';
import { PaginationResponse } from 'src/common/pagination-response';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllFiltered(
    @Query() filters: NoteFiltersDto,
  ): Promise<PaginationResponse<Note>> {
    return this.notesService.getAllFiltered(filters);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(dto);
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
