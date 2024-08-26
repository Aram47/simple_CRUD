const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb');
const { json } = require('stream/consumers');
const client = new MongoClient("mongodb://localhost:27017");
const dbName = "Registration";
const app = express();
const PORT = 5050;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

const URL = {
    "Home"     : "/",
    "SignIn"   : "/SignIn",
    "SignUp"   : "/SignUp",
    "Delete"   : "/Delete",
    "Forgot"   : "/Forgot",
};

async function main() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

    app.get(URL["Home"], (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "index.html"));
    });

    app.post(URL["SignIn"], (req, res) => { // Login
        const body = req.body;
        collection.findOne(body)
        .then((findRes) => {
            if (findRes === null) {
                res.status(404).send("User is not found!!!");
            } else {
                res.status(200).send(body);
            }
        })
    });

    app.post(URL["SignUp"], (req, res) => { // registration
        const body = req.body;
        collection.findOne(body)
        .then((findRes) => {
            if (findRes === null) {
                collection.insertOne(body);
                res.status(200).send("User is created in DB!!!")
            } else {
                res.status(500).send("User already been in DB!!!");
            }
        });
    });

    app.post(URL["Delete"], (req, res) => {
        const body = req.body;
        collection.findOne(body)
        .then((findRes) => {
            if (findRes === null) {
                res.status(404).send("User is not found!!!");
            } else {
                collection.deleteOne(body);
                res.status(200).send("User is deleted!!!");
            }
        });
    });

    app.post(URL["Forgot"], (req, res) => {
        const body = req.body;
        collection.findOne(body)
        .then((findRes) => {
            if (findRes === null) {
                res.status(404).send("User is not found!!!");
            } else {
                res.send(200).send(body);
            }
        });
    });

    app.listen(PORT);
}

main();