const assert = require('assert');
const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
    user: 'coder',
    host: '127.0.0.1',
    database: 'greetings',
    password: '8423',
    port: 5432
});