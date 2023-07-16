import { DataSourceOptions, DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';

export const Config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nestdb',
  entities: [User, Role],
  synchronize: true,
  migrationsTableName: 'migration_table',
  migrations: ['dist/user/migration/*.js'],
};

const dataSource = new DataSource(Config);

export default dataSource;
