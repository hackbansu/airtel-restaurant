/**
 * Created by hackbansu on 10/5/17.
 */
const express = require('express');
const db = require('./database/JS/database')
const path = require('path');
const app = express();


app.get('/', function (req, res) {
    res.send('working');
})

//req.query = {barcode}
app.get('/getProductDetails', function (req, res) {
    let barcode = req.query.barcode;
    if(!barcode || barcode.length>13 || barcode.length<12){
        res.send('invalid barcode!');
        return;
    }

    db.productsTable.getProductsDetails({barcode: barcode}, ['*'], function (result, fields) {
        // console.log(result);
        res.send(result);
    })
})

//req.query = {barcode}
app.get('/addProductToCart', function (req, res) {
    let barcode = req.query.barcode;
    if(!barcode || barcode.length>13 || barcode.length<12){
        res.send('invalid barcode!');
        return;
    }

    db.productsTable.decrementProductsQuantity({barcode: barcode}, function (result, fields) {
        // console.log(result);
        res.send(result);
    })
})

//req.query = {barcode}
app.get('/removeProductFromCart', function (req, res) {
    let barcode = req.query.barcode;
    if(!barcode || barcode.length>13 || barcode.length<12){
        res.send('invalid barcode!');
        return;
    }

    db.productsTable.incrementProductsQuantity({barcode: barcode}, function (result, fields) {
        // console.log(result);
        res.send(result);
    })
})

app.use('/getImage', express.static(path.join(__dirname, '/database/images/')));
app.use('/getDescription', express.static(path.join(__dirname, '/database/descriptions/')));

app.listen(4000, function () {
    console.log("server successfully started at 4000");
})