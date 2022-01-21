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


// Step_6
app.get("/movies/read/by-date", (req, res)=>{
    res.send({status:200, data:movies.sort((a,b)=>{
        return a.year-b.year
    })});
});

app.get("/movies/read/by-rating", (req, res)=>{
    res.send({status:200, data:movies.sort((a,b)=>{
        return a.rating-b.rating
    })});
});

app.get("/movies/read/by-title", (req, res)=>{
    res.send({status:200, data:movies.sort((a,b)=>{
        if(a.title<b.title){
            return -1;
        }if(a.title>b.title){return 1;}
        return 0;
    })});
});
/* Second Method:
const keyMapping = {
    "by-rating": "rating",
    "by-title": "title",
    "by-year": "year"
}

let orderArrayByKey = (arr, sortBy) => {
    let orderedArray = [...movies];
    let key = keyMapping[sortBy];

    orderedArray.sort((a, b) => {
        if (typeof a[key] === 'string'){
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        }
        return (a[key] - b[key]);
    });

    return orderedArray; */




app.listen(3000);