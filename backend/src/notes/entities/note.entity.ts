import { Column, CreateDateColumn, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';

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
}
