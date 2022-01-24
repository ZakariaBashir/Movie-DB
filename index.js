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
    { id:1, title: 'Jaws', year: 1975, rating: 8 },
    { id:2, title: 'Avatar', year: 2009, rating: 7.8 },
    { id:3, title: 'Brazil', year: 1985, rating: 8 },
    { id:4, title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
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

// Step_7
app.get("/movies/read/id/:id", (req, res)=>{
    if(req.params.id<1 || req.params.id>4){
        res.status(404).send({status:404, error:true, message:`the movie ${req.params.id} does not exist`});
    }else{
        res.send({status:200, data:movies.filter((movie)=>{return movie.id==req.params.id})})
    }
});
// Step_8
app.get("/movies/add", (req, res)=>{
    let {title, year, rating=4}=req.query;
    if (year) year = parseInt(year);
    let sortedById=[...movies].sort((a,b) => a.id - b.id)
    let id = sortedById[movies.length - 1].id + 1
    let movie = {id, title, year, rating};

    let valid= title && year && year.toString().length ===4 && typeof year === 'number';
    if(!valid){
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'});
    }else{
        movies.push(movie);
        res.send(movies);
    }
});
// Step_9:
app.get("/movies/delete/:id", (req, res) => {
    let id = `${req.params.id}`;
    let movie = movies.find(item => item.id == id)
    if (!movie) return res.send({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` })
    movies = movies.filter(item => item.id != id);
    res.send({ status: 200, data: movies })
});

// Step_10:
app.get('/movies/update/:id', function (req, res) {
    let { id } = req.params;
    let { title, year, rating } = req.query;
    if (year) year = parseInt(year);
    console.log(title + " " + year + " " + rating)
    let bodyOkay = title || (year && year.toString().length === 4 && typeof year === "number") || rating;
    if (!bodyOkay) return res.status(403).json({
        status: 403,
        error: true,
        message: 'you cannot update the movie'
    });

    let movie = movies.find(item => item.id == id);
    if (!movie) return res.status(404).json({
        status: 404, error: true, message: `the movie ${id} does not exist`
    });

    if (title) movie.title = title;
    if (year) movie.year = year;
    if (rating) movie.rating = rating;

    res.send({ status: 200, data: movies });
});

// Step_11:



app.listen(3000);