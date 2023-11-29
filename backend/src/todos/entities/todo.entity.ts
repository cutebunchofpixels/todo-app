import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Todo extends BaseEntity {
  @Column()
  content: string;

  @Column('boolean', { default: false })
  done: boolean;

  @Column()
  priority: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
