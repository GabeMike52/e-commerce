import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "",
    POSTGRES_USER: process.env.POSTGRES_USER || "",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "",
    POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
    JWT_SECRET: process.env.JWT_SECRET || "",
};

if (!ENV.POSTGRES_DATABASE || !ENV.POSTGRES_USER || !ENV.POSTGRES_PASSWORD || !ENV.POSTGRES_HOST) {
    throw new Error("Missing necessary environment variables!");
}

export default ENV;