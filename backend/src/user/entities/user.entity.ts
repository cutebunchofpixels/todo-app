import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';
import { Todo } from 'src/todos/entities/todo.entity';

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

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
