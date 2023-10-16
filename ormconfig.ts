import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*.js', 'src/migrations/*.js'],
};

export = connectionOptions;
