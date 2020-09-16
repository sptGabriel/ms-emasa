import envalid from 'envalid';
import dotenv from 'dotenv';
const { cleanEnv, port, str, host } = envalid;
export const validateEnv = () => {
  dotenv.config();
  cleanEnv(process.env, {
    NODE_ENV: str(),
    DB_HOST: host(),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASS: str(),
    DB_PORT: port(),
    SERVER_PORT: port(),
    RABBIT_HOST: str(),
  });
};
