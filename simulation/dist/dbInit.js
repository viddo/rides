//@ts-ignore
import pg from 'pg';
import { wait } from '../../shared/utils.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DBNAME, } = process.env;
let retries = 3;
const retryDelay = 2000;
export default async function dbInit() {
    return new Promise(async (resolve, reject) => {
        const { Client } = pg;
        const pool = new pg.Pool({
            host: POSTGRES_HOST,
            port: Number(POSTGRES_PORT),
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
            database: POSTGRES_DBNAME,
        });
        while (retries > 0) {
            try {
                await pool.connect();
                console.log('DB connected');
                resolve(pool);
                return;
            }
            catch (err) {
                console.error(`Connection error: ${JSON.stringify(err.stack)}`);
            }
            retries--;
            console.log(`Connection failed, retries remaining: ${retries}`);
            await wait(retryDelay);
        }
        reject(new Error('Failed to connect to database'));
    });
}
//# sourceMappingURL=dbInit.js.map