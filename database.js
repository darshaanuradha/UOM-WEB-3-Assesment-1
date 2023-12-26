var sqlite3 = require("sqlite3").verbose();

const DBSOURSE = "db.sqlite";

let db = new sqlite3.Database(DBSOURSE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQLite Database");
        var CreateTableSQL = `CREATE TABLE customer(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            email TEXT,
            dateOfBirth TEXT,
            gender TEXT,
            age TEXT,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timeStamp TEXT
            );`;
        db.run(CreateTableSQL, (err) => {
            if (err) {
                //Table already created
            } else {
                var insert = `INSERT INTO customer (
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
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
                db.run(insert,
                    [
                        'Darsha Anuradha',
                        '123 Main Street, Kandy',
                        'darsha@gmail.com',
                        '1996-01-15',
                        'Male',
                        '27',
                        'darsha anurdaha',
                        "123456789012",
                        '12/23',
                        '123',
                        '2023-12-25 12:34:56'
                    ], (err) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("Example customer inserted successfully");
                    }
                }
                );
            }
        });
    }
});
module.exports = db;