const express = require('express');
const app = express();

const PORT = 5050;
const DB = [];

function loginValidator(target) {
    DB.length;
    return true;
}

function signUpValidator(target) {
    return true;
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/Login", (req, res) => {
    if (loginValidator(req.body)) {

    }
});

app.get("/SignUP", (req, res) => {
    if (signUpValidator(req.body)) {

    }
});