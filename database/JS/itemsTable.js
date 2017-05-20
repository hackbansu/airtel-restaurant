/**
 * Created by hackbansu on 4/4/17.
 */

const mysql = require('mysql');
const database = require('./database.js');
const pool = database.pool;
const createQueryHavingWhereClause = database.createQueryHavingWhereClause;

//get required details(via details(array)) of all items and call done(result, fields)
function getItems(details, done) {

    sql = 'SELECT ?? FROM items ORDER BY category';
    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, [details], function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}

//get required details(via details(array)) of items via p_name_identity(object) and call done(result, fields)
function searchItems(identity, details, done) {
    let sql = "SELECT ?? FROM items WHERE p_name LIKE '%";
    for(i of identity.p_name){
        sql += i + '%'
    }
    sql += "'";

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, [details], function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}

function addNewProduct(product, done) {
    let sql = "INSERT INTO ITEMS SET ?";

    pool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(sql, [product], function (err, result, fields) {
            connection.release();
            if (err) throw err;

            done(result, fields);
        });
    });
}

function removeProduct(product, done) {
    let sql = "DELETE FROM ITEMS WHERE p_name = " + mysql.escape(product.p_name);

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
    getItems,
    searchItems,
    addNewProduct,
    removeProduct,
};