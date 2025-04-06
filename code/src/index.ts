import dotenv from 'dotenv';
import { main } from './main';

dotenv.config();

const port = +(process.env.PORT ?? 3000);

main(port);
