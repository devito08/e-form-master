import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "deepak",
    database: "empm"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to the database');
});

app.get("/api/get", (req, res) => {
    const sqlselect = "SELECT * FROM emptable";
    db.query(sqlselect, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send(results);
    });
});

app.delete("/api/delete/:name", (req, res) => {
    const name = req.params.name;
    const sqldelete = "DELETE FROM emptable WHERE name = ?";
    db.query(sqldelete, name, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).send(`Data for ${name} deleted successfully`);
    });
});

app.post("/api/insert", (req, res) => {
    const { name, dob, age, department, address, empid, salary, designation } = req.body;

    const sqlinsert = "INSERT INTO emptable (name, dob, age, department, address, empid, salary, designation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlinsert, [name, dob, age, department, address, empid, salary, designation], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(result);
        res.status(200).send("Data inserted successfully");
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
