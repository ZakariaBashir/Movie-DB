// Step_2
const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Ok");
});
/* app.get("/book",(req,res)=>{
    res.send("This is my ");
}); */

// Step_3
app.get("/test", (req, res)=>{
    res.send({status:200, message:"ok"});
});
app.get("/time", (req, res)=>{
    const date=new Date();
    res.send({status:200, message:`${date.getHours()}:${date.getSeconds()}` });
});

// Step_4
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

// Step_5
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

app.get("/movies/create", (req, res)=>{});
app.get("/movies/read", (req, res)=>{
    res.send({status:200, data:movies})
});
app.get("/movies/update", (req, res)=>{});
app.get("/movies/delete", (req, res)=>{});






app.listen(3000);