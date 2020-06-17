import {
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  Entity
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  receiver_id: string;

  @Column()
  content: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
