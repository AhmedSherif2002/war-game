const { con } = require("../dbConnection");

con.query("SELECT * FROM employees", (err,results)=>{
    if(err) throw err;
    console.log(results);
})