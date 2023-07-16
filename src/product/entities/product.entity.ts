import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  product_name: string;

  @Column({ type: 'bigint' })
  product_price: number;

  @Column({ type: 'varchar' })
  product_image: string;

  @Column({ name:'product_id' })
  productId: number;

  @ManyToOne(() => Category, (product) => product.categoryid)
  @JoinColumn({ name: 'product_id' })
  product: Category;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
