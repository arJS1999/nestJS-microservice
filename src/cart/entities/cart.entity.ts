import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  product_id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
