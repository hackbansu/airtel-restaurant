/**
 * Created by hackbansu on 4/4/17.
 */

const mysql = require('mysql');
const database = require('./database.js');
const pool = database.pool;
const createQueryHavingWhereClause = database.createQueryHavingWhereClause;

//get required details(via details(array)) of products via identity(object) and call done(result, fields)
function getProductsDetails(identity, details, done) {
    let sql = createQueryHavingWhereClause('SELECT ?? FROM products WHERE', identity);

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, [details], function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}

//decrement available quantity by 1 of products via identity(object) and call done(result, fields)
function decrementProductsQuantity(identity, done) {
    let sql = createQueryHavingWhereClause('UPDATE products SET available_quantity = available_quantity - 1 WHERE', identity);

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}

//increment available quantity by 1 of products via identity(object) and call done(result, fields)
function incrementProductsQuantity(identity, done) {
    let sql = createQueryHavingWhereClause('UPDATE products SET available_quantity = available_quantity + 1 WHERE', identity);

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}


module.exports = {
    getProductsDetails,
    decrementProductsQuantity,
    incrementProductsQuantity,
};