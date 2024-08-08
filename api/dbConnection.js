const { createConnection } = require("mysql");

const con = createConnection({
    host:"localhost",
    user:"root",
    passwrod:"",
    database:"mydb"
})

con.connect((error,results)=>{
    if(error) throw error;
    console.log("connected succesfully");
    console.log(results)
    con.query("USE mydb",(err,results)=>{
        if(err) throw err;
        console.log(results)
        con.query("SELECT * FROM employees",(err,results)=>{
            if(err) throw err;
            console.log(results)
            
        })
    })
})


module.exports = {
    con
}