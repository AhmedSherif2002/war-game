const apiUrl = "http://localhost:4000/";
const { createConnection } = require("mysql");

const con = createConnection({
    host:"localhost",
    user:"root",
    passwrod:"",
    database:"game"
})

module.exports = {
    con,
    apiUrl
}