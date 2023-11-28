import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Note extends BaseEntity {
  @Column()
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @Column()
  content: string;

  @Column('boolean', { default: false })
  done: boolean;

  @Column()
  priority: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
}
