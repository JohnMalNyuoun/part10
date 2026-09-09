import knex from 'knex';

import { KNEX_CONFIG } from '../config.js';

const db = knex(KNEX_CONFIG);

export default db;
