/**
 * Created by hackbansu on 21/5/17.
 */

const express = require('express');
const router = express.Router;
const route = router();
const db = require('./../../database/JS/database');

route.post('/addNewItem', function (req, res) {
    db.itemsTable.addNewItem(req.body.item, function (data) {
        // console.log(data);
        if(data.affectedRows === 1){
            res.json(true);
        }else{
            res.json(false);
        }
    });
});

route.get('/removeItem', function (req, res) {
    db.itemsTable.removeItem(req.body.item, function (data) {
        // console.log(data);
        if(data.affectedRows === 1){
            res.json(true);
        }else{
            res.json(false);
        }
    });
})


module.exports = route;
