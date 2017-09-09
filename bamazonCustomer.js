var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "user",

    // Your password
    password: "asdfasdfasdf",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
      .prompt([
        {
          name: "item_id",
          type: "input",
          message: "What is the ID of the product you would like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "stock_quantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var query = "SELECT * FROM products WHERE ? AND UPDATE products SET ?";
        connection.query(query, [answer.item_id, answer.stock_quantity], function(err, res) {
            console.log(
                "ID: " +
                res.item_id +
                " || Name: " +
                res.product_name +
                " || Department: " +
                res.department_name +
                " || Price: " +
                res.price +
                " || Quantity" +
                res.stock_quantity
            )
        });
    });
}
