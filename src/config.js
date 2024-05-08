const mongoose=require("mongoose")
const connect=mongoose.connect("mongodb://localhost:27017/login-aut")

//check
connect.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("database cannot be connected")
});

//create a schema
const LoginSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//collectin part
const collectin=new mongoose.model("users",LoginSchema);
module.exports=collectin;




