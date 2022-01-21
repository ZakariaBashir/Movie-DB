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
app.get("/time", (req, res)=>{
    const date=new Date();
    res.send({status:200, message:`${date.getHours()}:${date.getSeconds()}` });
});
app.get("/hello/:id", (req, res)=>{
    res.send({status:200, message:`Hello ${req.params.id}`});
});
app.get("/hello", (req, res)=>{
    res.send({status:200, message: `Hello`});
});

app.get("/search", (req, res)=>{
    let {s}=req.query;
    if(s){
        res.send({status:200, message:"ok", data:s});
    }else {
        res.send({status:500, error:true, message:"you have to provide a search"});
    }});







app.listen(3000);