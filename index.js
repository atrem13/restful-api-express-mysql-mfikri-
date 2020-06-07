const express =  require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// parse app/json
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'restful_db'
});

// connect to db
conn.connect((err) => {
  if(err) throw err;
  console.log('connect to mysql');
});

// get all product data
app.get('/api/products', (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, result) => {
    if(err) throw err;
    res.send(JSON.stringify({
      'status':200,
      'error':null,
      'response':result
    }));
  });
});

// get product base on id
app.get('/api/products/:id', (req, res) => {
  let sql = `SELECT * FROM product WHERE product_id=${req.params.id}`;
  let query = conn.query(sql, (err, result) => {
    if(err) throw err;
    res.send(JSON.stringify({
      'status':200,
      'error':null,
      'response':result
    }));
  });
});

// add new product
app.post('/api/products', (req, res) => {
  let data = {product_name:req.body.product_name, product_price:req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if(err) throw err;
    res.send(JSON.stringify({
      'status':200,
      'error':null,
      'response':result
    }));
  });
});

// update existing data
app.put('/api/products/:id', (req, res) => {
  //let sql = `UPDATE product SET product_name = ${req.body.product_name}, product_price = ${req.body.product_price} WHERE product_id = ${req.params.id}`;
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify({
      'status':200,
      'error':null,
      'response':result
    }));
  });
});

//Edit data product berdasarkan id
// app.put('/api/products/:id',(req, res) => {
//   let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });

// delete a product
app.delete('/api/products/:id', (req, res) => {
  let sql = `DELETE FROM product WHERE product_id = ${req.params.id}`;
  let query = conn.query(sql, (err, result) => {
    if(err) throw err;
    res.send(JSON.stringify({
      'status':200,
      'error':null,
      'response':result
    }));
  });
});


// server listening
app.listen(3000, () => {
  console.log('server staarted on posrt 3000');
});
