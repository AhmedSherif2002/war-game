const { createConnection } = require("mysql");

const con = createConnection({
    host:"localhost",
    user:"root",
    passwrod:"",
    database:"game"
})

module.exports = {
    con
}