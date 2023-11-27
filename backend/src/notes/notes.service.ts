import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { NoteFiltersDto } from './dto/notes-filters.dto';
import { PaginationResponse } from 'src/common/pagination-response';
import { Like } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepo: Repository<Note>,
  ) {}

  getById(id: number): Promise<Note> {
    return this.notesRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async getAllFiltered(
    filters: NoteFiltersDto,
  ): Promise<PaginationResponse<Note>> {
    const [notes] = await this.notesRepo.findAndCount({
      where: [
        {
          name: Like(`%${filters.text ?? ''}%`),
          done: filters.done,
        },
        {
          content: Like(`%${filters.text ?? ''}%`),
          done: filters.done,
        },
      ],
      take: filters.take,
      skip: filters.skip,
      order: filters.orderBy
        ? { [filters.orderBy]: filters.orderDirection }
        : undefined,
    });

    const [, total] = await this.notesRepo.findAndCount();

    return {
      items: notes,
      total,
    };
  }

  async create(dto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepo.create(dto);
    return this.notesRepo.save(note);
  }

  async update(id: number, dto: UpdateNoteDto): Promise<Note> {
    const note = await this.getById(id);
    Object.assign(note, dto);

    return this.notesRepo.save(note);
  }

  async remove(id: number): Promise<Note> {
    const note = await this.getById(id);

    return this.notesRepo.remove(note);
  }
}
