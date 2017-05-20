/**
 * Created by hackbansu on 20/5/17.
 */

const mysql = require('mysql');
const database = require('./database.js');
const pool = database.pool;
const createQueryHavingWhereClause = database.createQueryHavingWhereClause;

function getUsersDetails(identity, details, done) {
    createQueryHavingWhereClause("SELECT ?? FROM adminUsers WHERE ", identity)

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, [details], function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}

module.exports = {
    getUsersDetails,
};