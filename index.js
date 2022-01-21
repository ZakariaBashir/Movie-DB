const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Ok");
});
/* app.get("/book",(req,res)=>{
    res.send("This is my ");
}); */
app.get("/test", (req, res)=>{
    res.send({status:200, message:"ok"});
});
app.get ("/time", (req, res)=>{
    const date=new Date();
    res.send({status:200, message:`${date.getHours()}:${date.getSeconds()}` });
});







app.listen(3000);