/**
 * Created by hackbansu on 21/5/17.
 */

const express = require('express');
const router = express.Router;
const route = router();
const db = require('./../../database/JS/database');

route.post('/addNewProduct', function (req, res) {
    db.itemsTable.addNewProduct(req.body.product, function (data) {
        // console.log(data);
        if(data.affectedRows === 1){
            res.json(true);
        }else{
            res.json(false);
        }
    });
});

route.get('/removeProduct', function (req, res) {
    db.itemsTable.removeProduct(req.body.product, function (data) {
        // console.log(data);
        if(data.affectedRows === 1){
            res.json(true);
        }else{
            res.json(false);
        }
    });
})


module.exports = route;
