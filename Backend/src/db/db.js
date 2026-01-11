const mongoose = require("mongoose");

async function connectDb(){

  try{
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("Connected to MongoDB!!")

  }catch(err){
     console.log("Error Connecting to MongoDB!!" , err )
  }

}


module.exports = connectDb;