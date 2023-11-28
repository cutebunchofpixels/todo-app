import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshTokenHash: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
