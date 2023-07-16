import { DataSourceOptions, DataSource } from 'typeorm';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';

export const Config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestdb',
  entities: [Product, Category],
  synchronize: true,
  migrationsTableName: 'migration_table',
  migrations: ['dist/product/migration/*.js'],
};

const dataSource = new DataSource(Config);

export default dataSource;
