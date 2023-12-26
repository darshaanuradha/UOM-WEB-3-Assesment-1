var express = require("express");
var app = express();
var db = require("./database");
var bodyParser = require("body-parser");
const { request, response } = require("express");

app.use(bodyParser.json());
let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log("Sever is running on %PORT%".replace("%PORT%", HTTP_PORT));
});

const emailValidator = (email) => {
    // email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const creditCardNumberValidator = (creditCardNumber) => {
    //  credit card number validation
    const creditCardRegex = /^\d{12}$/;
    return creditCardRegex.test(creditCardNumber);
};

app.post("/api/customers", (req, res, next) => {
    try {
        var errors = [];
        if (!req.body) {
            errors.push("An invalid input");
            console.log("yes");
        }

        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = req.body;

        if (!name || !address || !email || !dateOfBirth || !gender || !age || !cardHolderName || !cardNumber || !expiryDate || !cvv || !timeStamp) {
            res.status(400).json({ "error": "Missing required fields" });
            return;
        }

        // Validate email address
        if (!emailValidator(email)) {
            res.status(400).json({ "error": "Invalid email address" });
            return;
        }

        // Validate credit card number
        if (!creditCardNumberValidator(cardNumber)) {
            res.status(400).json({ "error": "Invalid credit card number (should be 12 digits)" });
            return;
        }

        var sql = `INSERT INTO customer (
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
        
        var parms = [
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        ];

        db.run(sql, parms, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.status(201).json({
                    "message": "Customer " + req.body.name + " has registered",
                    "customerId": this.lastID,
                });
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});



// app.post("/api/customers", (req, res, next) => {
//     try {
//         var errors = [];
//         if (!req.body) {
//             errors.push("An invalid input");
//             console.log("yes");
//         };

//         const {
//             name,
//             address,
//             email,
//             dateOfBirth,
//             gender,
//             age,
//             cardHolderName,
//             cardNumber,
//             expiryDate,
//             cvv,
//             timeStamp } = req.body;
//         var sql = `INSERT INTO customer (
//                                         name,
//                                         address,
//                                         email,
//                                         dateOfBirth,
//                                         gender,
//                                         age,
//                                         cardHolderName,
//                                         cardNumber,
//                                         expiryDate,
//                                         cvv,
//                                         timeStamp) 
//                             VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
//         var parms = [
//             name,
//             address,
//             email,
//             dateOfBirth,
//             gender,
//             age,
//             cardHolderName,
//             cardNumber,
//             expiryDate,
//             cvv,
//             timeStamp];

//         db.run(sql, parms, function (err) {
//             if (err) {
//                 res.status(400).json({ "error": err.message });
//                 return;
//             } else {
//                 res.json({
//                     "message": "customer "+req.body.name+" has registered",
//                     "customerId": this.lastID,
//                 })
//             }
//         });
//     } catch (E) {
//         res.status(400).send(E);
//     }

// });

























// app.get("/api/products", (req, res, next) => {
//     try {
//         var sql = "SELECT * FROM products";
//         var parms = [];

//         db.all(sql, parms, (err, rows) => {
//             if (err) {
//                 res.status(400).json({ "Error": err.message });
//             }
//             res.json({
//                 "message": "success",
//                 "data": rows
//             });

//         })
//     } catch (E) { res.status(400).send(E); }
// });

// app.put("/api/products", (req, res, next) => {
//     try {
//         const {
//             id,
//             productName,
//             description,
//             category,
//             brand,
//             expiredDate,
//             manufacturedDate,
//             batchNumber,
//             unitPrice,
//             quantity,
//             createdDate } = req.body;
//         var sql = `UPDATE products
//         SET
//           productName = ?,
//           description = ?,
//           category = ?,
//           brand = ?,
//           expiredDate = ?,
//           manufacturedDate = ?,
//           batchNumber = ?,
//           unitPrice = ?,
//           quantity = ?,
//           createdDate = ?
//         WHERE
//           id = ?;
//         `;
//         var parms = [
//             productName,
//             description,
//             category,
//             brand,
//             expiredDate,
//             manufacturedDate,
//             batchNumber,
//             unitPrice,
//             quantity,
//             createdDate,
//             id];

//         db.run(sql, parms, function (err, result) {
//             if (err) {
//                 res.status(400).json({ "Error": res.message });
//                 return;
//             }
//             res.status(200).json({ Updated: this.changes })
//         });
//     } catch (E) {
//         res.status(400).send(E);
//     }

// });

// app.delete("/api/products/delete/:id", (req, res, next) => {
//     try {
//         db.run('DELETE FROM products WHERE id= ? ',
//             req.params.id,
//             function (err, result) {
//                 if (err) {
//                     res.status(400).json({ "error": res.message });
//                     return;
//                 }
//                 res.json({ "message": "Record Deleted", rows: this.changes })
//             });
//     } catch (E) {
//         res.status(400).send(E);
//     }
// })

