const mongoose = require('mongoose');


//method
const dbConnect= async()=>{
 try{
  const connect = await mongoose.connect(process.env.DB_URL);
   console.log(`Database Connected: ${connect.connection.host}, ${connect.connection.name}`) // here host is a compouter, mongodb is inside the computer, liveserver- server is the host

 }catch(err){
    console.log(err);
    process.exit(1);
 }
};

module.exports = dbConnect;