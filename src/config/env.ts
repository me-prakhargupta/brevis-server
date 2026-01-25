import "dotenv/config";
import type { StringValue} from "ms";

const requireEnv = (key: string): string => {
    const value = process.env[key];
    if(!value) throw new Error("Missing environment variable");

    return value;
}

export const PORT: string = requireEnv("PORT");

export const MONGO_URI: string = requireEnv("MONGO_URI");
export const DB_NAME: string = requireEnv("DB_NAME");

export const ACCESS_TOKEN_SECRET = requireEnv("ACCESS_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRY = requireEnv("ACCESS_TOKEN_EXPIRY") as StringValue;

export const REFRESH_TOKEN_SECRET = requireEnv("REFRESH_TOKEN_SECRET")
export const REFRESH_TOKEN_EXPIRY = requireEnv("REFRESH_TOKEN_EXPIRY") as StringValue;