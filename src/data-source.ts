import { DataSourceOptions, DataSource } from 'typeorm';
import { Cart } from './cart/entities/cart.entity';

export const Config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestdb',
  entities: [Cart],
  synchronize: true,
  migrationsTableName: 'migration_table',
  migrations: [],
};

const dataSource = new DataSource(Config);

export default dataSource;
