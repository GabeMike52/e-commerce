import "reflect-metadata";
import { registerAs } from "@nestjs/config";
import ENV from "src/config/dotenv.config";

export default registerAs('database', () => ({
    type: 'postgres',
    host: ENV.POSTGRES_HOST || 'localhost',
    port: Number(ENV.POSTGRES_PORT) || 5432,
    username: ENV.POSTGRES_USER || 'postgres',
    password: ENV.POSTGRES_PASSWORD || 'postgres',
    database: ENV.POSTGRES_DATABASE || 'ecommerce',
    synchronize: true,
    logging: true,
}));