// const mongoose = require('mongoose');/
// //declare connection port on lcoalhost
// mongoose.connect("mongodb://127.0.0.1/student");
// //store in db name variable
// const db = mongoose.connection;
// // db.on('error',console.error.bind(console,"DB IS CONNECTED"));
// db.once('open',(error)=>{
//     if(error){
//         console.log("Db is not connected");
//     }
//     console.log("Db is connected !");
// })

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
//declare connection port on lcoalhost
mongoose.connect("mongodb://127.0.0.1/transpor");
//store in db name variable
const db = mongoose.connection;
// db.on('error',console.error.bind(console,"DB IS CONNECTED"));
db.once('open',(error)=>{
    if(error){
        console.log("Db is not connected");
    }
    console.log("Db is connected !");
})

module.exports = db;
